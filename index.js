import express from 'express';
import cors from 'cors';

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];

const app = express();
app.use(cors());

// resposta a requizicao 
app.get("/holidays", (request, response) => {
    response.send(holidays);
})

app.get("/is-today-holiday", (request, response) => {
    const d = new Date();
    let day = d.toLocaleDateString('en-US');
    let today = holidays.findIndex((e) => e.date == day); 
    if(today >= 0){
        response.send(`Sim, hoje é ${holidays[today].name}`);
    }else{
        response.send('Não, hoje não é feriado');
    }
})
app.get(`/holidays/:mes`, (request, response) => {
    let feriados = holidays.filter((e) => {
        let data = e.date.split('/');
        if(data[0] === request.params.mes){
            return e;
        }
    })
    response.send(feriados);
})

// aguardando,. escutador na porta 4000, calback;
app.listen(4000, () => {
    console.log('servidor ativo')
})