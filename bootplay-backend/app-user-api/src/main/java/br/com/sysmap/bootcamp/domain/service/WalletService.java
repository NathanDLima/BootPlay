package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.entities.Wallet;
import br.com.sysmap.bootcamp.domain.repository.WalletRepository;
import br.com.sysmap.bootcamp.dto.WalletDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.*;
import java.util.Base64;


@RequiredArgsConstructor
@Service
public class WalletService {


    private final UsersService usersService;
    private final WalletRepository walletRepository;

    public void debit(WalletDto walletDto) {
        Users users = usersService.findByEmail(walletDto.getEmail());
        Wallet wallet = walletRepository.findByUsers(users).orElseThrow();
        wallet.setBalance(wallet.getBalance().subtract(walletDto.getValue()));

        int points = calculatePoints(LocalDate.now().getDayOfWeek());
        wallet.setPoints(wallet.getPoints() + points);

        walletRepository.save(wallet);

    }

    /* public Wallet getWalletByUserId(Long id){
         Users users = usersService.findById(id);
         return this.walletRepository.findByUsers(users).orElseThrow(() -> new RuntimeException("Wallet does not exists in this user"));

     }*/
    public Wallet getWalletByAuthenticatedUser(String token) {
        if(token.startsWith("Basic ")){
            token = token.substring(6);
        }
        String decodedToken = new String(Base64.getDecoder().decode(token));
        String email = decodedToken.split(":")[0];


        Users user = usersService.findByEmail(email);
        return this.walletRepository.findByUsers(user).orElseThrow(() -> new RuntimeException("Wallet does not exists in this user"));

    }

    public void creditWallet(WalletDto walletDto){
        Users users = usersService.findByEmail(walletDto.getEmail());
        Wallet wallet = walletRepository.findByUsers(users).orElseThrow(() -> new RuntimeException("User with this wallet was not found"));
        wallet.setBalance(wallet.getBalance().add(walletDto.getValue()));
        walletRepository.save(wallet);
    }

    private int calculatePoints(DayOfWeek dayOfWeek){
        int pointsEarned = 0;
        switch (dayOfWeek){
            case SUNDAY:
                pointsEarned = 25;
                break;
            case MONDAY:
                pointsEarned = 7;
                break;
            case TUESDAY:
                pointsEarned = 6;
                break;
            case WEDNESDAY:
                pointsEarned = 2;
                break;
            case THURSDAY:
                pointsEarned = 10;
                break;
            case FRIDAY:
                pointsEarned = 15;
                break;
            case SATURDAY:
                pointsEarned = 20;
                break;
        }
        return pointsEarned;
    }

}
