package com.example.SpringBootDemo.controller;

import com.example.SpringBootDemo.model.Post;
import com.example.SpringBootDemo.model.Post;
import com.example.SpringBootDemo.model.User;
import com.example.SpringBootDemo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/rest/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping(value = "/")
    public ResponseEntity<Post> create(@RequestBody Post post) {
        postService.save(post);
        System.out.println(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



    @GetMapping(value = "/")
    public ResponseEntity<List<Post>> getAll() {
        List<Post> posts = postService.listAllPosts();
        return posts != null && !posts.isEmpty() ? new ResponseEntity<>(posts, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Post> getPost(@PathVariable(name = "id") int id) {
        Post post = postService.get((long) id);
        return post != null ? new ResponseEntity<>(post, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/")
    public ResponseEntity<Post> updatePost  (@RequestBody Post post) {
        postService.save(post);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Post> deletePost(@PathVariable(name = "id") int id) {
        postService.delete((long) id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
