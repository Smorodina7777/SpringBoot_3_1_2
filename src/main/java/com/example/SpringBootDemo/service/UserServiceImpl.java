package com.example.SpringBootDemo.service;

import com.example.SpringBootDemo.Repository.UserRepository;
import com.example.SpringBootDemo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    @Autowired
    private UserRepository repo;
    @Override
    @Transactional
    public User save(User user) {
        return repo.save(user);
    }
    @Override
    @Transactional
    public List<User> listAll() {
        return repo.findAll();
    }
    @Override
    @Transactional
    public User get(Long id) {
        return repo.findById(id).get();
    }
    @Override
    @Transactional
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repo.findByEmail(email).orElseThrow(() -> new RuntimeException("Еmail: " + email + " не зарегистрирован."));
    }
}
