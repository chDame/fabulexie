package org.fabulexie.rest.auth;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.rest.util.SecurityUtils;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

@Aspect
@Component
public class AuthenticationAspect {

    @Before("@annotation(authorizationValidation)")
    public void beforeRestrictedMethod(JoinPoint joinPoint, AuthorizationValidation authorizationValidation)
            throws UnauthorizedException {
        MethodSignature sig = (MethodSignature) joinPoint.getSignature();
        List<String> parameterNames = Arrays.asList(sig.getParameterNames());
        Optional<String> tokenParameter = parameterNames.stream()
                .filter(item -> item.equals(authorizationValidation.name()))
                .findFirst();

        String token = "";
        if (tokenParameter.isPresent()) {
            token = joinPoint.getArgs()[parameterNames.indexOf(tokenParameter.get())].toString();
        }
        DecodedJWT decoded = SecurityUtils.decodeToken(token);
        
        if (decoded == null) {
            throw new UnauthorizedException("Reauthentication required");
        }
        
        if (authorizationValidation.admin()) {
            if (!decoded.getClaim("admin").asBoolean()) {
                throw new UnauthorizedException("Action forbidden");
            }
        }

        if (authorizationValidation.tutor()) {
        	if (!decoded.getClaim("tutor").asBoolean() && !decoded.getClaim("admin").asBoolean()) {
                throw new UnauthorizedException("Action forbidden");
            }
        }
    }
}
