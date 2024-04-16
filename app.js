document.addEventListener('DOMContentLoaded', function() {
    const machineForm = document.getElementById('machineForm');
    const machineList = document.getElementById('machineList');
    const body = document.querySelector('body');

    machineForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('nameInput').value;
        const price = document.getElementById('priceInput').value;
        const speed = document.getElementById('speedInput').value;
        const imgLink = document.getElementById('imgInput').value;
        const color = document.getElementById('colorInput').value;

        const machine = {
            name,
            price,
            speed,
            imgLink,
            color
        };

        addMachineToList(machine);
        saveMachine(machine);

        machineForm.reset();
    });

    function addMachineToList(machine) {
        const machineItem = document.createElement('div');
        machineItem.classList.add('machine-item');
        machineItem.innerHTML = `
        <img src="${machine.imgLink}" alt="${machine.name}">
        <span>Name: ${machine.name}</span>
        <span>Price: $${machine.price}</span>
        <span>Speed: ${machine.speed} km</span>
        <button onclick="deleteMachine(this)">Delete</button>
        
      `;
        machineItem.style.backgroundColor = machine.color;
        machineList.appendChild(machineItem);
    }

    function saveMachine(machine) {
        let machines = localStorage.getItem('machines');
        machines = machines ? JSON.parse(machines) : [];
        machines.push(machine);
        localStorage.setItem('machines', JSON.stringify(machines));
    }

    function deleteMachine(button) {
        const machineItem = button.parentElement;
        const machineName = machineItem.querySelector('span').textContent.split(': ')[1];
        let machines = JSON.parse(localStorage.getItem('machines'));
        machines = machines.filter(machine => machine.name !== machineName);
        localStorage.setItem('machines', JSON.stringify(machines));
        machineItem.remove();
    }

    const storedMachines = JSON.parse(localStorage.getItem('machines')) || [];
    storedMachines.forEach(machine => addMachineToList(machine));

});
