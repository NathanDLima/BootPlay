package br.com.sysmap.bootcamp.domain.service;


import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.repository.UsersRepository;
import br.com.sysmap.bootcamp.domain.repository.WalletRepository;
import br.com.sysmap.bootcamp.dto.AuthDto;
import org.h2.engine.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UsersServiceTest {

    @Autowired
    private UsersService usersService;

    @MockBean
    private UsersRepository usersRepository;

    @MockBean
    private WalletRepository walletRepository;

    @Mock
    private PasswordEncoder passwordEncoder;



    @Test
    @DisplayName("Should return users when valid users is saved")
    public void shouldReturnUsersWhenValidUsersIsSaved(){
        Users users = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        when(usersRepository.save(any(Users.class))).thenReturn(users);

        Users savedUsers = usersService.create(users);

        Wallet wallet = new Wallet();
        wallet.setId(1L);
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setPoints(0L);
        wallet.setLastUpdate(LocalDateTime.now());
        wallet.setUsers(savedUsers);

        this.walletRepository.save(wallet);

        assertEquals(users, savedUsers);
    }


    @Test
    @DisplayName("Should return a valid user by his email")
    public void shouldReturnValidUserByHisEmail() {
        Users users = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        when(usersRepository.findByEmail(users.getEmail())).thenReturn(Optional.of(users));


        Users foundUser = usersService.findByEmail(users.getEmail());

        assertEquals(users, foundUser);
    }


    @Test
    @DisplayName("Should return the user when a valid id is passed")
    public void shouldReturnUserWhenValidIdIsPassed(){
        Users users = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        when(usersRepository.findById(users.getId())).thenReturn(Optional.of(users));

        Users foundUsers = usersService.findById(users.getId());

        assertEquals(users, foundUsers);
    }

    @Test
    @DisplayName("Should return a list of all valid users")
    public void shouldReturnAllValidUsers(){
        Users users1 = Users.builder().id(1L).name("teste1").email("test1@email.com").password("teste1").build();
        Users users2 = Users.builder().id(2L).name("teste2").email("test2@email.com").password("teste2").build();

        List<Users> usersList = Arrays.asList(users1, users2);
        when(usersRepository.findAll()).thenReturn(usersList);

        List<Users> foundUsersList = usersService.getUsers();

        assertEquals(usersList, foundUsersList);
    }

    @Test
    @DisplayName("Should update a user object when a valid id and new data is passed")
    public void ShouldUpdateUserWhenValidIdAndNewDataIsPassed(){
        Users existingUsers = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        Users updatedUsers = Users.builder().id(1L).name("testeAtualizado").email("novoTest@email.com").password("novoTeste").build();
        when(usersRepository.findById(existingUsers.getId())).thenReturn(Optional.of(existingUsers));
        when(usersRepository.save(any(Users.class))).thenAnswer(invocation -> invocation.getArgument(0));



        Users resultUsers = usersService.update(existingUsers.getId(), updatedUsers);


        assertEquals(updatedUsers.getEmail(), resultUsers.getEmail());

        Mockito.verify(usersRepository, times(1)).save(existingUsers);
    }

    /*
    @Test
    @DisplayName("Should return an AuthDto object when valid email and password is passed")
    public void shouldReturnAuthDtoWhenValidEmailAndPassword(){
        Users users = Users.builder().id(1L).name("teste").email("test@email.com").password("teste").build();
        when(usersRepository.findByEmail(users.getEmail())).thenReturn(Optional.of(users));

        AuthDto authDto = usersService.auth(AuthDto.builder().email(users.getEmail()).password(users.getPassword()).build());

        assertEquals(users.getEmail(), authDto.getEmail());
        assertEquals(users.getId(), authDto.getId());
        assertTrue(authDto.getToken().startsWith("Basic "));
    }
    */

}
