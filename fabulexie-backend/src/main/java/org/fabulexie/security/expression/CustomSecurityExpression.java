package org.fabulexie.security.expression;

import java.util.LinkedHashMap;

import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

public class CustomSecurityExpression extends SecurityExpressionRoot implements MethodSecurityExpressionOperations {

    private Object filterObject;
    private Object returnObject;

    public CustomSecurityExpression(Authentication authentication) {
        super(authentication);
    }

    @SuppressWarnings("unchecked")
	public boolean isSelf(Long userId) {
        final LinkedHashMap<String, Object> user = ((LinkedHashMap<String, Object>) this.getPrincipal());
        return ((Integer) user.get("id")).longValue() == userId.longValue();
    }

    @Override
    public Object getFilterObject() {
        return this.filterObject;
    }

    @Override
    public Object getReturnObject() {
        return this.returnObject;
    }

    @Override
    public Object getThis() {
        return this;
    }

    @Override
    public void setFilterObject(Object obj) {
        this.filterObject = obj;
    }

    @Override
    public void setReturnObject(Object obj) {
        this.returnObject = obj;
    }

}