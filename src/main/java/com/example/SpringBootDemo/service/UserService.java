package com.example.SpringBootDemo.service;

import com.example.SpringBootDemo.model.User;

import java.util.List;

public interface UserService {
    User get(Long id);
    List<User> listAll();
    User save(User user);
    void delete(Long id);
}
