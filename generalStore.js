document.addEventListener('DOMContentLoaded', async function () {
    const btn = document.querySelector('#addItem');

    btn.addEventListener('click', async function () {
        const obj = {
            item: document.querySelector('#itemName').value,
            itemDescription: document.querySelector('#description').value,
            cost: document.querySelector('#price').value,
            quantity: document.querySelector('#quantity').value
        };

        try {
            const response = await axios.post("https://crudcrud.com/api/3dc3db59fb3a42cab8e12eece8fa079d/data", obj);
            showOutput(response.data);
        } catch (err) {
            console.error(err);
        }
    });

    function showOutput(param) {
        const ul = document.querySelector('#print');
        const li = document.createElement('li');
        const text = "Item: " + param.item + ", Description: " + param.itemDescription + ", Cost: " + param.cost + ", Quantity: " + param.quantity;
        li.textContent = text;

        const buyBtn = document.createElement('button');
        buyBtn.id = "buy_" +param._id;
        buyBtn.textContent = 'Buy_1';

        li.appendChild(buyBtn);
        ul.appendChild(li);

        buyBtn.addEventListener('click', async function () {
            try {
                await axios.put("https://crudcrud.com/api/3dc3db59fb3a42cab8e12eece8fa079d/data/"+param._id, {
                    item: param.item,
                    itemDescription: param.itemDescription,
                    cost: param.cost,
                    quantity: param.quantity - 1
                });

                const updatedItemResponse = await axios.get("https://crudcrud.com/api/3dc3db59fb3a42cab8e12eece8fa079d/data/"+param._id);
                const updatedItem = updatedItemResponse.data;

                buyBtn.parentElement.remove();
                li.textContent = "Item: " + updatedItem.item + ", Description: " + updatedItem.itemDescription + ", Cost: " + updatedItem.cost + ", Quantity: " + updatedItem.quantity;
                li.appendChild(buyBtn);
                ul.appendChild(li);

                param.quantity = updatedItem.quantity;
            } catch (err) {
                console.error(err);
            }
        });
    }

    try {
        const response = await axios.get("https://crudcrud.com/api/3dc3db59fb3a42cab8e12eece8fa079d/data");
        response.data.forEach(param => {
            showOutput2(param);
        });
    } catch (err) {
        console.error(err);
    }

    function showOutput2(param) {
        const ul = document.querySelector('#print');
        const li = document.createElement('li');
        const text = "Item: " + param.item + ", Description: " + param.itemDescription + ", Cost: " + param.cost + ", Quantity: " + param.quantity;
        li.textContent = text;

        const buyBtn = document.createElement('button');
        buyBtn.id = "buy_"+param._id;
        buyBtn.textContent = 'Buy_1';

        li.appendChild(buyBtn);
        ul.appendChild(li);

        buyBtn.addEventListener('click', async function () {
            try {
                await axios.put("https://crudcrud.com/api/3dc3db59fb3a42cab8e12eece8fa079d/data/"+param._id, {
                    item: param.item,
                    itemDescription: param.itemDescription,
                    cost: param.cost,
                    quantity: param.quantity - 1
                });

                const updatedItemResponse = await axios.get("https://crudcrud.com/api/3dc3db59fb3a42cab8e12eece8fa079d/data/${param._id}");
                const updatedItem = updatedItemResponse.data;

                buyBtn.parentElement.remove();
                li.textContent = "Item: " + updatedItem.item + ", Description: " + updatedItem.itemDescription + ", Cost: " + updatedItem.cost + ", Quantity: " + updatedItem.quantity;
                li.appendChild(buyBtn);
                ul.appendChild(li);

                param.quantity = updatedItem.quantity;
            } catch (err) {
                console.error(err);
            }
        });
    }
});
