package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Newjhip3App;

import com.mycompany.myapp.domain.Ingredients;
import com.mycompany.myapp.repository.IngredientsRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.Language;
/**
 * Test class for the IngredientsResource REST controller.
 *
 * @see IngredientsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Newjhip3App.class)
public class IngredientsResourceIntTest {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final Integer DEFAULT_MONTH = 1;
    private static final Integer UPDATED_MONTH = 2;

    private static final Integer DEFAULT_DATE = 1;
    private static final Integer UPDATED_DATE = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CUISINE = "AAAAAAAAAA";
    private static final String UPDATED_CUISINE = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGES = "AAAAAAAAAA";
    private static final String UPDATED_IMAGES = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Language DEFAULT_LANGUAGE = Language.ENGLISH;
    private static final Language UPDATED_LANGUAGE = Language.JAPANESE;

    @Autowired
    private IngredientsRepository ingredientsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restIngredientsMockMvc;

    private Ingredients ingredients;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IngredientsResource ingredientsResource = new IngredientsResource(ingredientsRepository);
        this.restIngredientsMockMvc = MockMvcBuilders.standaloneSetup(ingredientsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ingredients createEntity(EntityManager em) {
        Ingredients ingredients = new Ingredients()
            .year(DEFAULT_YEAR)
            .month(DEFAULT_MONTH)
            .date(DEFAULT_DATE)
            .name(DEFAULT_NAME)
            .cuisine(DEFAULT_CUISINE)
            .images(DEFAULT_IMAGES)
            .description(DEFAULT_DESCRIPTION)
            .language(DEFAULT_LANGUAGE);
        return ingredients;
    }

    @Before
    public void initTest() {
        ingredients = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngredients() throws Exception {
        int databaseSizeBeforeCreate = ingredientsRepository.findAll().size();

        // Create the Ingredients
        restIngredientsMockMvc.perform(post("/api/ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredients)))
            .andExpect(status().isCreated());

        // Validate the Ingredients in the database
        List<Ingredients> ingredientsList = ingredientsRepository.findAll();
        assertThat(ingredientsList).hasSize(databaseSizeBeforeCreate + 1);
        Ingredients testIngredients = ingredientsList.get(ingredientsList.size() - 1);
        assertThat(testIngredients.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testIngredients.getMonth()).isEqualTo(DEFAULT_MONTH);
        assertThat(testIngredients.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testIngredients.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testIngredients.getCuisine()).isEqualTo(DEFAULT_CUISINE);
        assertThat(testIngredients.getImages()).isEqualTo(DEFAULT_IMAGES);
        assertThat(testIngredients.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testIngredients.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createIngredientsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingredientsRepository.findAll().size();

        // Create the Ingredients with an existing ID
        ingredients.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredientsMockMvc.perform(post("/api/ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredients)))
            .andExpect(status().isBadRequest());

        // Validate the Ingredients in the database
        List<Ingredients> ingredientsList = ingredientsRepository.findAll();
        assertThat(ingredientsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIngredients() throws Exception {
        // Initialize the database
        ingredientsRepository.saveAndFlush(ingredients);

        // Get all the ingredientsList
        restIngredientsMockMvc.perform(get("/api/ingredients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredients.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].cuisine").value(hasItem(DEFAULT_CUISINE.toString())))
            .andExpect(jsonPath("$.[*].images").value(hasItem(DEFAULT_IMAGES.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getIngredients() throws Exception {
        // Initialize the database
        ingredientsRepository.saveAndFlush(ingredients);

        // Get the ingredients
        restIngredientsMockMvc.perform(get("/api/ingredients/{id}", ingredients.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingredients.getId().intValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.cuisine").value(DEFAULT_CUISINE.toString()))
            .andExpect(jsonPath("$.images").value(DEFAULT_IMAGES.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIngredients() throws Exception {
        // Get the ingredients
        restIngredientsMockMvc.perform(get("/api/ingredients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngredients() throws Exception {
        // Initialize the database
        ingredientsRepository.saveAndFlush(ingredients);

        int databaseSizeBeforeUpdate = ingredientsRepository.findAll().size();

        // Update the ingredients
        Ingredients updatedIngredients = ingredientsRepository.findById(ingredients.getId()).get();
        // Disconnect from session so that the updates on updatedIngredients are not directly saved in db
        em.detach(updatedIngredients);
        updatedIngredients
            .year(UPDATED_YEAR)
            .month(UPDATED_MONTH)
            .date(UPDATED_DATE)
            .name(UPDATED_NAME)
            .cuisine(UPDATED_CUISINE)
            .images(UPDATED_IMAGES)
            .description(UPDATED_DESCRIPTION)
            .language(UPDATED_LANGUAGE);

        restIngredientsMockMvc.perform(put("/api/ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIngredients)))
            .andExpect(status().isOk());

        // Validate the Ingredients in the database
        List<Ingredients> ingredientsList = ingredientsRepository.findAll();
        assertThat(ingredientsList).hasSize(databaseSizeBeforeUpdate);
        Ingredients testIngredients = ingredientsList.get(ingredientsList.size() - 1);
        assertThat(testIngredients.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testIngredients.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testIngredients.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testIngredients.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testIngredients.getCuisine()).isEqualTo(UPDATED_CUISINE);
        assertThat(testIngredients.getImages()).isEqualTo(UPDATED_IMAGES);
        assertThat(testIngredients.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testIngredients.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingIngredients() throws Exception {
        int databaseSizeBeforeUpdate = ingredientsRepository.findAll().size();

        // Create the Ingredients

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngredientsMockMvc.perform(put("/api/ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredients)))
            .andExpect(status().isBadRequest());

        // Validate the Ingredients in the database
        List<Ingredients> ingredientsList = ingredientsRepository.findAll();
        assertThat(ingredientsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIngredients() throws Exception {
        // Initialize the database
        ingredientsRepository.saveAndFlush(ingredients);

        int databaseSizeBeforeDelete = ingredientsRepository.findAll().size();

        // Delete the ingredients
        restIngredientsMockMvc.perform(delete("/api/ingredients/{id}", ingredients.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ingredients> ingredientsList = ingredientsRepository.findAll();
        assertThat(ingredientsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ingredients.class);
        Ingredients ingredients1 = new Ingredients();
        ingredients1.setId(1L);
        Ingredients ingredients2 = new Ingredients();
        ingredients2.setId(ingredients1.getId());
        assertThat(ingredients1).isEqualTo(ingredients2);
        ingredients2.setId(2L);
        assertThat(ingredients1).isNotEqualTo(ingredients2);
        ingredients1.setId(null);
        assertThat(ingredients1).isNotEqualTo(ingredients2);
    }
}
