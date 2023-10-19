package com.desenvolvimento.webCarShop.handler;

import com.desenvolvimento.webCarShop.entities.error.ErrorMessage;
import com.desenvolvimento.webCarShop.entities.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {

        ErrorMessage errorMessage = new ErrorMessage("Not found", HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }
}
