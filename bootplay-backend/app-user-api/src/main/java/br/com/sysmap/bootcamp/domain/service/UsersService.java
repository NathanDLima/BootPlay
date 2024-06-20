package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.repository.UsersRepository;
import br.com.sysmap.bootcamp.domain.repository.WalletRepository;
import br.com.sysmap.bootcamp.dto.AuthDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final WalletRepository walletRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public Users create(Users user){
        Optional<Users> usersOptional = this.usersRepository.findByEmail(user.getEmail());
        if(usersOptional.isPresent()){
            throw new RuntimeException("User already exists!");
        }



        user = user.toBuilder().password(this.passwordEncoder.encode(user.getPassword())).build();

        log.info("Saving user: {}", user);

        Users createdUser = this.usersRepository.save(user);

        Wallet wallet = new Wallet();
        wallet.setBalance(BigDecimal.valueOf(1000));
        wallet.setPoints(0L);
        wallet.setLastUpdate(LocalDateTime.now());
        wallet.setUsers(createdUser);

        this.walletRepository.save(wallet);

        return createdUser;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> usersOptional = this.usersRepository.findByEmail(username);

        return usersOptional.map(users -> new User(users.getEmail(), users.getPassword(), new ArrayList<GrantedAuthority>()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));

    }

    public Users findByEmail(String email){
        return this.usersRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public AuthDto auth(AuthDto authDto){
        Users users = this.findByEmail(authDto.getEmail());

        if(!this.passwordEncoder.matches(authDto.getPassword(), users.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        StringBuilder password = new StringBuilder().append(users.getEmail()).append(":").append(users.getPassword());
        AuthDto userDetails = AuthDto.builder().email(users.getEmail()).password(password.toString()).build();

        return AuthDto.builder().email(users.getEmail()).token(
                Base64.getEncoder().withoutPadding().encodeToString(password.toString().getBytes())
        ).id(users.getId()).build();

    }

    public List<Users> getUsers() {
        return this.usersRepository.findAll();
    }

    public Users findById(Long id) {
        return this.usersRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
    }

    public Users update(Long id, Users user) {
        Users existingUser = usersRepository.findById(id).orElseThrow(() -> new RuntimeException("User does not exist in database"));

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return this.usersRepository.save(existingUser);


    }
}
