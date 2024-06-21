package br.com.sysmap.bootcamp.web;

import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.service.UsersService;
import br.com.sysmap.bootcamp.dto.AuthDto;
import brave.Response;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    @Operation(summary = "Save user")
    @PostMapping("/create")
    public ResponseEntity<Users> create(@RequestBody Users user){
        return ResponseEntity.ok(this.usersService.create(user));
    }

    @Operation(summary = "Auth user")
    @PostMapping("/auth")
    public ResponseEntity<AuthDto> auth(@RequestBody AuthDto user){
        return ResponseEntity.ok(this.usersService.auth(user));
    }

    @Operation(summary = "Get all users")
    @GetMapping()
    public ResponseEntity<List<Users>> getUsers(){
        return ResponseEntity.ok(this.usersService.getUsers());
    }

    @Operation(summary = "Get users by id")
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(this.usersService.findById(id));
    }

    @Operation(summary = "Update user")
    @PutMapping("/update")
    public ResponseEntity<Users> update(@RequestParam("id") Long id, @RequestBody Users user) {
        return ResponseEntity.ok(this.usersService.update(id, user));
    }
}
