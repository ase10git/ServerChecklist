package com.ase.serverckecklist.storage;

public class StorageException extends RuntimeException {

    // RuntimeException은 Java Virtual Machine의 일반 동작 중에 처리될 수 있는 예외들의 상위 클래스이다.

    // 예외 처리 생성자 설정
    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
