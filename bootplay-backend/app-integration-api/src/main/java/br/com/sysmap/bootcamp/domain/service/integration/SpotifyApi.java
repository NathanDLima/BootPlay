package br.com.sysmap.bootcamp.domain.service.integration;

import br.com.sysmap.bootcamp.domain.mapper.AlbumMapper;
import br.com.sysmap.bootcamp.domain.model.AlbumModel;
import com.neovisionaries.i18n.CountryCode;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Service
public class SpotifyApi {

    private se.michaelthelin.spotify.SpotifyApi spotifyApi = new se.michaelthelin.spotify.SpotifyApi.Builder()
            .setClientId("07787ed997e44093a5e59e5e4bb16e11")
            .setClientSecret("ff7fcd223ba64c79a8903590b4d48d52")
            .build();

    public List<AlbumModel> getAlbums(String search) throws IOException, ParseException, SpotifyWebApiException {
        spotifyApi.setAccessToken(getToken());
        return AlbumMapper.INSTANCE.toModel(spotifyApi.searchAlbums(search).market(CountryCode.BR)
                        .limit(30)
                        .build().execute().getItems()).stream()
                .peek(album -> album.setValue(BigDecimal.valueOf((Math.random() * ((100.00 - 12.00) + 1)) + 12.00)
                        .setScale(2, BigDecimal.ROUND_HALF_UP))).toList();
    }

    public String getToken() throws IOException, ParseException, SpotifyWebApiException {
        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
        return clientCredentialsRequest.execute().getAccessToken();
    }
}