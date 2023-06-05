package com.example.SpringBootDemo.service;

import com.example.SpringBootDemo.Repository.PostRepository;
import com.example.SpringBootDemo.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Transactional
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Transactional
    public List<Post> listAllPosts() {
        return postRepository.findAll();
    }
    @Transactional
    public List<Post> listAllUserPosts(Long userId) {
        return  postRepository.findByUser_Id(userId);
    }

    @Transactional
    public Post get(Long id) {
        return postRepository.findById(id).get();
    }

    @Transactional
    public void delete(Long id) {
        postRepository.deleteById(id);
    }



}
