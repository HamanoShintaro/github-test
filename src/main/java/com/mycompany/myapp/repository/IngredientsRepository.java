package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Ingredients;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ingredients entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IngredientsRepository extends JpaRepository<Ingredients, Long> {

}
