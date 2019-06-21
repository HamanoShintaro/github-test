package com.mycompany.myapp.web.rest;
import com.mycompany.myapp.domain.Ingredients;
import com.mycompany.myapp.repository.IngredientsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ingredients.
 */
@RestController
@RequestMapping("/api")
public class IngredientsResource {

    private final Logger log = LoggerFactory.getLogger(IngredientsResource.class);

    private static final String ENTITY_NAME = "ingredients";

    private final IngredientsRepository ingredientsRepository;

    public IngredientsResource(IngredientsRepository ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }

    /**
     * POST  /ingredients : Create a new ingredients.
     *
     * @param ingredients the ingredients to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ingredients, or with status 400 (Bad Request) if the ingredients has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ingredients")
    public ResponseEntity<Ingredients> createIngredients(@RequestBody Ingredients ingredients) throws URISyntaxException {
        log.debug("REST request to save Ingredients : {}", ingredients);
        if (ingredients.getId() != null) {
            throw new BadRequestAlertException("A new ingredients cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ingredients result = ingredientsRepository.save(ingredients);
        return ResponseEntity.created(new URI("/api/ingredients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ingredients : Updates an existing ingredients.
     *
     * @param ingredients the ingredients to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ingredients,
     * or with status 400 (Bad Request) if the ingredients is not valid,
     * or with status 500 (Internal Server Error) if the ingredients couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ingredients")
    public ResponseEntity<Ingredients> updateIngredients(@RequestBody Ingredients ingredients) throws URISyntaxException {
        log.debug("REST request to update Ingredients : {}", ingredients);
        if (ingredients.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ingredients result = ingredientsRepository.save(ingredients);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ingredients.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ingredients : get all the ingredients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ingredients in body
     */
    @GetMapping("/ingredients")
    public List<Ingredients> getAllIngredients() {
        log.debug("REST request to get all Ingredients");
        return ingredientsRepository.findAll();
    }

    /**
     * GET  /ingredients/:id : get the "id" ingredients.
     *
     * @param id the id of the ingredients to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ingredients, or with status 404 (Not Found)
     */
    @GetMapping("/ingredients/{id}")
    public ResponseEntity<Ingredients> getIngredients(@PathVariable Long id) {
        log.debug("REST request to get Ingredients : {}", id);
        Optional<Ingredients> ingredients = ingredientsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ingredients);
    }

    /**
     * DELETE  /ingredients/:id : delete the "id" ingredients.
     *
     * @param id the id of the ingredients to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<Void> deleteIngredients(@PathVariable Long id) {
        log.debug("REST request to delete Ingredients : {}", id);
        ingredientsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
