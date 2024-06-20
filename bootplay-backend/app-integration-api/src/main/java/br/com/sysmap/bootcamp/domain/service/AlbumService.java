package br.com.sysmap.bootcamp.domain.service;

import br.com.sysmap.bootcamp.domain.entities.Album;
import br.com.sysmap.bootcamp.domain.entities.Users;
import br.com.sysmap.bootcamp.domain.model.AlbumModel;
import br.com.sysmap.bootcamp.domain.repository.AlbumRepository;
import br.com.sysmap.bootcamp.domain.service.integration.SpotifyApi;
import br.com.sysmap.bootcamp.dto.WalletDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.ParseException;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.exceptions.detailed.NotFoundException;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class AlbumService {

    private final Queue queue;
    private final RabbitTemplate template;
    private final SpotifyApi spotifyApi;
    private final AlbumRepository albumRepository;
    private final UsersService usersService;

    public void teste(){

    }

    public List<AlbumModel> getAlbums(String search) throws IOException, ParseException, SpotifyWebApiException {
        return this.spotifyApi.getAlbums(search);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Album saveAlbum(Album album) {
        Users users = getUser();
        Optional<Album> albumOptional = albumRepository.findByUsersAndIdSpotify(users, album.getIdSpotify());
        if(albumOptional.isPresent()) {
            throw new RuntimeException("This user already has this album");
        }

        album.setUsers(getUser());

        Album albumSaved = albumRepository.save(album);

        WalletDto walletDto = new WalletDto(albumSaved.getUsers().getEmail(), albumSaved.getValue());
        this.template.convertAndSend(queue.getName(), walletDto);

        return albumSaved;
    }

    private Users getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        return usersService.findByEmail(username);
    }

    public List<Album> getMyCollection(String token){
        if(token.startsWith("Basic ")){
            token = token.substring(6);
        }
        String decodedToken = new String(Base64.getDecoder().decode(token));
        String email = decodedToken.split(":")[0];
        Users users = usersService.findByEmail(email);

        return albumRepository.findAllByUsers(users);
    }

    public void removeAlbum(Long id) {

        Album album = albumRepository.findById(id).orElseThrow(() -> new RuntimeException("There is no album with the id provided"));
        albumRepository.delete(album);
    }


}
