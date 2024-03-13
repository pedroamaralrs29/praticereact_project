import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; // Importação separada do Button

import axios from 'axios';

import { AiOutlineSearch } from "react-icons/ai";

import styles from '../styles/Deputados.module.css';
import { useState } from 'react';

const Deputados = () => {
    const [deputados, setDeputados] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [mandatosExternos, setMandatosExternos] = useState([]);

    const [selectedDeputadoId, setSelectedDeputadoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${searchQuery}&ordem=ASC&ordenarPor=nome`
            );
            setDeputados(response.data.dados);
            setDespesas([]);
            setMandatosExternos([]);
        } catch (error) {
            console.error('Erro ao buscar deputados:', error);
        } finally {
            setIsLoading(false); // Definir isLoading como falso, independentemente do resultado
        }
    };

    const loadDespesas = async (deputadoId) => {
        try {
            setIsLoading(true);
            const despesasResponse = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/despesas?ordem=ASC&ordenarPor=ano`);
            setDespesas(despesasResponse.data.dados);
            setSelectedDeputadoId(deputadoId);
        } catch (error) {
            console.error('Erro ao carregar despesas dos deputados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMandatosExternos = async (deputadoId) => {
        try {
            setIsLoading(true);
            const mandatosExternosResponse = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/mandatosExternos`);
            setMandatosExternos(mandatosExternosResponse.data.dados);
        } catch (error) {
            console.error('Erro ao carregar mandatos externos dos deputados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={styles.inputContainer}>
                <h3>Insira o nome do deputado:</h3>
                <div className={styles.searchContainer}>
                    <TextField
                        type="text"
                        sx={{ 
                          width: 300, 
                          marginRight: 1, 
                          backgroundColor: '#f0f0f0',
                          border: '2px solid #006400',

                        }}
                        className={styles.inputField}
                        placeholder='Insira o nome do deputado'
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                    type='submit'  
                    className={styles.buttonDeputados} 
                    sx={{
                      backgroundColor: '#00A600', 
                      color: 'white', 
                      borderRadius: '4px', 
                      padding: '10px 20px', 
                      border: 'none', 
                      transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' },
                      cursor: 'pointer', 
                      '&:hover': {
                        backgroundColor: '#008C00', 
                      },
                    }}
                    onClick={handleSearch}>
                        <AiOutlineSearch />
                    </Button>
                </div>
            </div>
              {isLoading && (
              <div className={styles.loadingContainer}>
                <CircularProgress className={styles.loadingIcon} />
              </div>
              )}
            <Grid container spacing={2} className={styles.cardGridContainer}>
                {deputados.map((deputado) => (
                    <Grid item key={deputado.id} xs={12} sm={6} md={4} lg={3}>
                        <Card key={deputado.id} 
                        sx={{ 
                          width: 300, 
                          margin: '20px',
                           height: 400, 
                           backgroundColor: '#f0f0f0', 
                           borderRadius: '10px', 
                           boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                           border: '2px solid #006400',
                           transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }} 
                           className={`${styles.cardContainer} ${selectedDeputadoId === deputado.id ? styles.selectedCard : ''}`} onClick={() => { loadDespesas(deputado.id); loadMandatosExternos(deputado.id); }} >
                        <CardMedia
                            component="img"
                            height="200"
                            image={deputado.urlFoto}
                            alt="Imagem do deputado"
                            style={{ width: 'auto', maxHeight: '200px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ maxWidth: 200 }}>
                                {deputado.nome}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Partido: {deputado.siglaPartido}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Estado: {deputado.siglaUf}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                E-mail: {deputado.email}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
            <div className={styles.informacoesExtras}>
                {despesas.length > 0 && selectedDeputadoId && (
                    <ul className={styles.listaDespesas}>
                        <h2>Lista de despesas do deputado selecionado</h2>
                        {despesas.map((despesa) => (
                            <li key={despesa.codDocumento}>{despesa.nomeFornecedor}
                                <p> R$ {despesa.valorDocumento.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {!isLoading && despesas.length === 0 && selectedDeputadoId && (
                    <p>Nenhuma despesa encontrada para este deputado.</p>
                )}

                {mandatosExternos.length > 0 && selectedDeputadoId && (
                    <ul className={styles.mandatosExternos}>
                        <h2> Lista de mandatos externos do Deputado: </h2>
                        {mandatosExternos.map((mandatoExterno) => (
                            <li key={mandatoExterno.id}> {mandatoExterno.cargo} {mandatoExterno.anoInicio} / {mandatoExterno.anoFim}</li>
                        ))}
                    </ul>
                )}

                {!isLoading && mandatosExternos.length === 0 && selectedDeputadoId && (
                    <ul className={styles.mandatosExternos}>
                        <h2> Lista de mandatos externos do Deputado: </h2>
                        <li> Este deputado não possui mandatos anteriores </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default Deputados;
