// create
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbFilme')) ?? [];
const setLocalStorage = (dbFilme) => localStorage.setItem('dbFilme', JSON.stringify(dbFilme));

const createFilme = (clienteFilme) => {
    const dbFilme = getLocalStorage();
    dbFilme.push(clienteFilme);
    setLocalStorage(dbFilme);
}

// read
 const readFilme = () => getLocalStorage();

 // update
 const updateFilme = (index, clienteFilme) => {
     const dbFilme = readFilme()
     dbFilme[index] = clienteFilme
     setLocalStorage(dbFilme)
 }
// delete
 const deleteFilme = (index) => {
     const dbFilme = readFilme()
     dbFilme.splice(index, 1)
     setLocalStorage(dbFilme)
 }

 
 