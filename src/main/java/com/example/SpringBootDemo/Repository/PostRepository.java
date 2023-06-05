package com.example.SpringBootDemo.Repository;

import com.example.SpringBootDemo.model.Post;
import com.example.SpringBootDemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

List<Post> findByUser_Id(Long userId);


}
