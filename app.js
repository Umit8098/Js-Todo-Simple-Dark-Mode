
//! ***** Elementleri değişkenlere atayalım; ***** */
const todoInput = document.getElementById('todoInput');
const todoAddButton = document.getElementById('addTodoButton'); 
// const todoDeleteButton = document.getElementById('deleteTodoButton'); 
const todoList = document.getElementById('todoList');

// dilSection.appendChild(ul); //* oluşturullan ul'i dilSection'ın child'ı yaparak bağla.


//! ***** LocalStorage'dan verileri alalım; ***** */
let todos = JSON.parse(localStorage.getItem('todos')) || [];


//! Eğer localStorage'da 'todos' anahtarı altında veri varsa, onu al; yoksa boş bir dizi oluştur. Sayfa açıldığında mevcut verileri listele
document.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todoObj => {
        createTodoElement(todoObj);
    });
});



//! ***** Event Listener'ı tanımlayalım; ***** */
todoAddButton.addEventListener('click', () => {
    console.log(todoInput.value); // input değerini konsola yazdır
    const inputValue = todoInput.value.trim();


    if (todoInput.value.trim() === '') {
        alert('Lütfen bir görev girin!'); // input boşsa uyarı ver
        return; // fonksiyondan çık
    }

    const newTodo = {
        text: inputValue,
        completed: false
    };

    createTodoElement(newTodo); // DOM'a ekle
    todos.push(newTodo); // array'e ekle
    localStorage.setItem('todos', JSON.stringify(todos)); // storage'a yaz

    todoInput.value = ''; // input değerini temizle
    todoInput.focus(); // kullanıcıyı tekrar input'a yönlendir

});


todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        todoAddButton.click(); // butonu tetikle
    }
});


function createTodoElement(todoObj) {
    const li = document.createElement('li');
    li.textContent = todoObj.text;

    //  // Tamamlandı mı? class ekle
    // if (todoObj.completed) {
    //     li.classList.add('completed');
    //     todoDeleteButton.remove(); // ✅ sadece butonu kaldır
    // }

    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.textContent = 'Sil';
    todoDeleteButton.classList.add('delete-btn');

    li.appendChild(todoDeleteButton);
    todoList.appendChild(li);

    li.addEventListener('click', () => {
        li.classList.toggle('completed');

        // ilgili todo'nun completed durumunu tersine çevir
        todos = todos.map(t => {
            if (t.text === todoObj.text) {
                const updatedTodo = { ...t, completed: !t.completed };
                
                // ✅ Sil butonunu göster/gizle
                todoDeleteButton.style.display = updatedTodo.completed ? 'none' : 'inline';

                return updatedTodo;
            }
            return t;
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    });

         // Tamamlandı mı? class ekle
    if (todoObj.completed) {
        li.classList.add('completed');
        todoDeleteButton.style.display = "none"; // ✅ sadece butonu gizle
    } else {
        li.classList.remove('completed');
        todoDeleteButton.style.display = 'inline'; // ✅ geri getir
    }


    todoDeleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // li'ye tıklamayı tetiklemesin
        li.remove();

        // localStorage'tan da sil
        todos = todos.filter(t => t.text !== todoObj.text);
        localStorage.setItem('todos', JSON.stringify(todos));
    });
}


// ! ***** For Dark Mode ***** */
const darkModeToggle = document.getElementById('darkModeToggle');

// Tema durumu localStorage'da varsa uygula
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        darkModeToggle.checked = true;
    }
});

// Toggle değiştiğinde body class'ını güncelle
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    }
});
