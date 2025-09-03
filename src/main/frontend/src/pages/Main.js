import styles from 'styles/pages/main.module.css';
import { Carousel, CarouselItem, Container } from 'react-bootstrap';
import ServerInfoContainer from 'components/main/ServerInfoContainer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { index } from 'api/server';
import { getImage } from 'api/image';

function Main() {

    const [serverData, setServerData] = useState([]);
    const navigate = useNavigate();

    function handleServerAdd() {
        navigate('/servers/add');
    }

    useEffect(()=>{
        document.title = "서버메모";
        // 서버 리스트 가져오기
        async function getServers() {
            const res = await index();
            if (res) {
                setServerData(res);
            }
        }
        getServers();
    }, []);

    return(
        <Container className={styles.container}>
            <h1 className={styles.main_title}>서버 모음에 오신 것을 환영합니다!</h1>
            <div className={styles.visual}>
                <h2 className={styles.title}>최근 업데이트 된 서버</h2>
                <Carousel className={styles.server_list_box}>
                {
                    serverData.map((el)=>{
                        return (
                            <CarouselItem key={el.id}>
                                <ServerInfoContainer data={el}/>
                            </CarouselItem>
                        );
                    })
                }
                </Carousel>
            </div>
            <div className={styles.server_list_box}>
                <h2 className={styles.title}>서버 목록</h2>
                <div className={styles.btn_wrap}>
                    <button className='add_btn'
                    onClick={handleServerAdd}>서버 추가</button>
                </div>
                <div className={styles.server_box}>
                {
                    serverData.map((el)=>{
                        return (
                            <ServerInfoContainer key={el.id} data={el}/>
                        );
                    })
                }
                </div>
            </div>
        </Container>
    )
}

export default Main;