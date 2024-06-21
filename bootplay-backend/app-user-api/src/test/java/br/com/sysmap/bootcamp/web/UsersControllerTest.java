package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.service.UsersService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class UsersControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsersService usersService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
    }


    @Test
    @DisplayName("Should return users when valid users is saved")
    public void shouldReturnUsersWhenValidUsersIsSaved() throws Exception {


        Users users = Users.builder().id(1L).name("teste").email("test").password("teste").build();

        Mockito.when(usersService.create(any(Users.class))).thenReturn(users);

        mockMvc.perform(post("/users/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(users)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(users)));
    }

    @Test
    @DisplayName("Should return all valid users")
    public void shouldReturnAllValidUsers() throws Exception {
        Users users1 = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        Users users2 = Users.builder().id(2L).name("teste2").email("test2@email.com").password("teste2").build();

        List<Users> usersList = Arrays.asList(users1, users2);
        Mockito.when(usersService.getUsers()).thenReturn(usersList);

        mockMvc.perform(get("/users").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usersList))).andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(usersList)));
    }

    @Test
    @DisplayName("Should return the user when a valid id is passed")
    public void shouldReturnUserWhenValidIdIsPassed() throws Exception {
        Users users = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        Mockito.when(usersService.findById(users.getId())).thenReturn(users);

        mockMvc.perform(get("/users/{id}", users.getId()).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(users))).andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(users)));
    }

    @Test
    @DisplayName("Should update a user object when a valid id and new data is passed")
    public void ShouldUpdateUserWhenValidIdAndNewDataIsPassed() throws Exception {
        Users existingUsers = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        Users updatedUsers = Users.builder().id(1L).name("testeAtualizado").email("novoTest@email.com").password("novoTeste").build();
        Mockito.when(usersService.findById(existingUsers.getId())).thenReturn(existingUsers);
        Mockito.when(usersService.update(existingUsers.getId(), updatedUsers)).thenReturn(updatedUsers);

        // Act
        mockMvc.perform(put("/users/update").param("id", String.valueOf(existingUsers.getId())).content(objectMapper.writeValueAsString(updatedUsers))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }
}
