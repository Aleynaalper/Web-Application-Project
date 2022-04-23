package com.example.shelltox.repos;

import com.example.shelltox.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findLikeByUserIdAndPostId(Long userId, Long postId);

    List<Like> findLikeByUserId(Long userId);

    List<Like> findLikeByPostId(Long postId);
}
