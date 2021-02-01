package com.generation.universogames.model;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class PercorsoFile {

	private final Path percorsoFile;
	
	public PercorsoFile(@Value("${file.upload}") String caricaCartella) {
		percorsoFile = Paths.get(caricaCartella)
				.toAbsolutePath().normalize();
		try {
			Files.createDirectories(this.percorsoFile);
		} catch (IOException e) {
		      System.err.println("Non è stato possibile creare la cartella dove uploadare i file");
		}
	}
	
	 /**
     * Metodo che salva nel percorso definito il file che arriva da parametro
     * Salva dal FE al BE.
     * @param file Dal controller arriverà un oggetto di tipo MultiPartFile
     * @return Il nome del file (Il nome può essere poi utilizzato per essere, ad esempio, salvato nel DB
     */
	public String salvaFile(MultipartFile file) {
        String nomeFile = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // A partire dal percorso dove salvo i file ricavo il percorso che avrà il file
            Path localizzazioneCartella = this.percorsoFile.resolve(nomeFile);
            // Utilizzo Files per copiare il file arrivato da parametro nella specifica cartella
            // vado a sovrascrivere se esiste già
            Files.copy(file.getInputStream(), localizzazioneCartella, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return nomeFile;
    }
	
	 /**
     * A partire dal nome del file carico, se esiste dal disco fisso
     * Carica nel BE
     * @param fileName
     * @return
     */
	 public Resource loadFile(String nomeFile) {
	        try {
	            Path percorsoImmagine = this.percorsoFile.resolve(nomeFile).normalize();
	            Resource risorsa = new UrlResource(percorsoImmagine.toUri());

	            if (risorsa.exists()) {
	                return risorsa;
	            }
	        } catch (MalformedURLException e) {
	            e.printStackTrace();
	        }
	        return null;
	    }
}