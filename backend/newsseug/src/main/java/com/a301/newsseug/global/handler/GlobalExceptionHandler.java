package com.a301.newsseug.global.handler;

import static com.a301.newsseug.global.constant.StringFormat.VALIDATED_ERROR_RESULT;
import static com.a301.newsseug.global.constant.StringFormat.VALID_ERROR_RESULT;
import static com.a301.newsseug.global.exception.ErrorCode.FAIL_TO_VALIDATE;

import com.a301.newsseug.global.exception.ErrorCode;
import com.a301.newsseug.global.exception.BaseException;
import jakarta.annotation.Nullable;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BaseException.class)
    protected ResponseEntity<Object> handleBase(
            BaseException e, WebRequest request
    ) {

        ErrorCode errorCode = e.getErrorCode();
        ServletWebRequest servletWebRequest = (ServletWebRequest) request;

        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ErrorResponse
                        .builder(e, errorCode.getStatus(), errorCode.getMessage())
                        .title(e.getClass().getSimpleName())
                        .instance(URI.create(servletWebRequest.getRequest().getRequestURI()))
                        .build());

    }

    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<Object> handleRuntimeException(
            RuntimeException e, WebRequest request
    ) {

        ServletWebRequest servletWebRequest = (ServletWebRequest) request;
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse
                        .builder(e, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage())
                        .title(e.getClass().getSimpleName())
                        .instance(URI.create(servletWebRequest.getRequest().getRequestURI()))
                        .build());

    }

    @Override
    @Nullable
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e, HttpHeaders headers, HttpStatusCode status, WebRequest request
    ) {

        ErrorCode errorCode = FAIL_TO_VALIDATE;
        ServletWebRequest servletWebRequest = (ServletWebRequest) request;

        BindingResult bindingResult = e.getBindingResult();
        List<String> errors = new ArrayList<>();
        bindingResult.getFieldErrors().stream()
                .forEach(fieldError ->
                        errors.add(
                                String.format(
                                        VALID_ERROR_RESULT,
                                        fieldError.getDefaultMessage(),
                                        fieldError.getField(),
                                        fieldError.getRejectedValue()
                                )
                        )
                );

        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ErrorResponse
                        .builder(e, errorCode.getStatus(), errorCode.getMessage())
                        .title(e.getClass().getSimpleName())
                        .instance(URI.create(servletWebRequest.getRequest().getRequestURI()))
                        .property("error", errors)
                        .build());

    }

    @Override
    protected ResponseEntity<Object> handleHandlerMethodValidationException(
            HandlerMethodValidationException e, HttpHeaders headers, HttpStatusCode status, WebRequest request
    ) {
        ErrorCode errorCode = FAIL_TO_VALIDATE;
        ServletWebRequest servletWebRequest = (ServletWebRequest) request;

        List<String> errors = new ArrayList<>();
        e.getAllErrors().forEach(validationResult -> {
            if (validationResult instanceof FieldError) {
                FieldError fieldError = (FieldError) validationResult;
                errors.add(String.format(
                        VALIDATED_ERROR_RESULT,
                        fieldError.getDefaultMessage(),
                        fieldError.getRejectedValue()
                ));
            } else {
                errors.add(validationResult.getDefaultMessage());
            }
        });

        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ErrorResponse
                        .builder(e, errorCode.getStatus(), errorCode.getMessage())
                        .title(e.getClass().getSimpleName())
                        .instance(URI.create(servletWebRequest.getRequest().getRequestURI()))
                        .property("error", errors)
                        .build());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException e, WebRequest request
    ) {

        ErrorCode errorCode = FAIL_TO_VALIDATE;
        ServletWebRequest servletWebRequest = (ServletWebRequest) request;

        List<String> errors = new ArrayList<>();
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        constraintViolations.stream()
                .forEach(constraintViolation ->
                        errors.add(
                                String.format(
                                        VALIDATED_ERROR_RESULT,
                                        constraintViolation.getMessage(),
                                        constraintViolation.getInvalidValue()
                                )
                        )
                );

        return ResponseEntity
                .status(errorCode.getStatus())
                .body(ErrorResponse
                        .builder(e, errorCode.getStatus(), errorCode.getMessage())
                        .title(e.getClass().getSimpleName())
                        .instance(URI.create(servletWebRequest.getRequest().getRequestURI()))
                        .property("error", errors)
                        .build());
    }

}
