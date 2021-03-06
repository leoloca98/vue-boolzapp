/*

Milestone 1:
- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi)
  e dall’interlocutore (bianco) assegnando due classi CSS diverse.
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for,
  visualizzare nome e immagine di ogni contatto.

Milestone 2
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
  nome e immagine di ogni contatto.
- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for,
  visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione.
- Click sul contatto mostra la conversazione del contatto cliccato.

Milestone 3 
- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene
  aggiunto al thread sopra, come messaggio verde.
- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta,
  che apparirà dopo 1 secondo.

Milestone 4
- Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome
  contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina).

*Milestone 5 (BONUS)
- Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.
|- Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato.


*/

console.log('Vue Ready', Vue);

Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    data: {
        selected: 'Marco Lanci',
        currentContact: 0,
        searchInput: '',
        newText: '',
        newMessage: null,
        newAnswer: null,
        flag: null,
        bG: '',

        user: {
            name: 'Leonardo Locatelli',
            avatar: '_8',
        },
        contacts: [
            {
                name: 'Marco Lanci',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received',
                    },
                ],
            },
            {
                name: 'Fabio Zeta',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent',
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received',
                    },
                ],
            },
            {
                name: 'Emanuele Grotta',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received',
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received',
                    },
                ],
            },
            {
                name: 'Giorgia Tasselli',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                    },
                ],
            },
        ],
    },
    methods: {
        selectedContact(contatto, index) {
            this.selected = contatto.name;
            this.currentContact = index;
        },
        addMessage() {
            if (this.contacts[this.currentContact].name === this.selected) {
                let now = dayjs();
                this.newMessage = {
                    date: now.format("DD/MM/YYYY HH:mm:ss"),
                    message: this.newText,
                    status: 'sent',
                };
                this.contacts[this.currentContact].messages.push(this.newMessage);
                this.answerMessage();
            };
            this.newText = '';
        },
        answerMessage() {
            let now = dayjs();
            let something;
            this.newAnswer = {
                date: now.format("DD/MM/YYYY HH:mm:ss"),
                message: 'Ok',
                status: 'received',
            };
            something = this.contacts[this.currentContact].messages;
            setTimeout(() => something.push(this.newAnswer), 1000);
        },
        filterContact(text) {
            if (!this.serachInput === '') return true;
            const filter = this.searchInput.toLowerCase();
            text = text.toLowerCase();
            return text.includes(filter);
        },
        getLastSeen() {
            const messages = this.contacts[this.currentContact].messages;
            const receivedMessages = messages.filter((message) => message.status === 'received');
            const lastMessage = receivedMessages[receivedMessages.length - 1];
            return lastMessage.date;
        },
    },
});