package com.issa.h2.service;

public interface LoginService {
    String getLogin(String email, String password);

    String registerUser(String username, String email, String password);

    void addWin(String username);
}
