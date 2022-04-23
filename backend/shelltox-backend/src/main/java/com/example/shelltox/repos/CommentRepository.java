package com.example.shelltox.repos;

import com.example.shelltox.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByUserIdAndPostId(Long userId, Long postId);

    List<Comment> findCommentByUserId(Long userId);

    List<Comment> findCommentByPostId(Long postId);
}
