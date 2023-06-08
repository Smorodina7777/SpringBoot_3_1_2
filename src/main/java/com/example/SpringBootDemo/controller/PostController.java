package com.example.SpringBootDemo.controller;

import com.example.SpringBootDemo.model.Post;
import com.example.SpringBootDemo.model.Post;
import com.example.SpringBootDemo.model.Role;
import com.example.SpringBootDemo.model.User;
import com.example.SpringBootDemo.service.PostService;
import com.example.SpringBootDemo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "rest/user")
@AllArgsConstructor
public class PostController {

    @Autowired
    PostService postService;
    private UserService userService;

    @GetMapping(value = "/post")
    public ResponseEntity<List<Post>> getAllUserPost(){
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        List<Post> posts = postService.listAllUserPosts(user.getId());
        posts.sort(Comparator.comparing(Post::getPubDate).reversed());
        return posts != null && !posts.isEmpty() ? new ResponseEntity<>(posts, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping(value = "/post/{id}")
    public ResponseEntity<User> deleteUserPost(@PathVariable(name = "id") Long id){
        postService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/post")
    public ResponseEntity<Post> updatePost(@RequestBody Post post){
        postService.save(post);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/post")
    public ResponseEntity<Post> create(@RequestBody Post post){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        post.setUser(user);
        post.setPubDate(LocalDate.now());
        post.setAuthor(user.getName());
        postService.save(post);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "post/{id}")
    public ResponseEntity<Post> getPost(@PathVariable(name= "id") Long id){
        Post post = postService.get(id);
        return post != null ? new ResponseEntity<>(post,HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
