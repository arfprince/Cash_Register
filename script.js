const displayPrice=document.querySelector("#price");
const btn=document.querySelector("#purchase-btn");
const input=document.querySelector("#cash");
const penny=document.querySelector("#PENNY");
const nickel=document.querySelector("#NICKEL");
const dime=document.querySelector("#DIME");
const quarter=document.querySelector("#QUARTER");
const one=document.querySelector("#ONE");
const five=document.querySelector("#FIVE");
const ten=document.querySelector("#TEN");
const twenty=document.querySelector("#TWENTY");
const hundred=document.querySelector("#ONE-HUNDRED");
const output=document.querySelector("#change-due");

let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
let arr=[0.01,0.05,0.1,0.25,1,5,10,20,100];
displayPrice.innerText=`Total: $${price}`;
function randerDrawer(){
    let total=0;
    for(let i=0;i<9;i++)
    {
        total+=cid[i][1];
        if(cid[i][0]==="PENNY"){
            penny.innerText=`Pennies: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="NICKEL"){
            nickel.innerText=`Nickels: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="DIME"){
            dime.innerText=`Dimes: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="QUARTER"){
            quarter.innerText=`Quarters: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="ONE"){
            one.innerText=`Ones: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="FIVE"){
            five.innerText=`Fives: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="TEN"){
            ten.innerText=`Tens: $${cid[i][1]}`;
        }
        else if(cid[i][0]==="TWENTY"){
            twenty.innerText=`Twenties: $${cid[i][1]}`;
        }
        else{
            hundred.innerText=`Hundreds: $${cid[i][1]}`;
        }
    }
    return total;
}
let total=randerDrawer();
function purchase(ammount) {

    if(ammount===price){
        const msg=document.createElement("h4");
        msg.innerText="No change due - customer paid with exact cash";
        output.appendChild(msg);
    }
    else if(total<ammount-price){
        const msg=document.createElement("h4");
        msg.innerText="Status: INSUFFICIENT_FUNDS";
        output.appendChild(msg);
    }
    else if(ammount<price){
        alert("Customer does not have enough money to purchase the item");
    }
    else
    {
        let baki=ammount-price;
        let changes = {};
        
        for(let i=8;i>=0;i--)
        {
            if(arr[i]<=baki)
            {
                let x = Math.floor(baki / arr[i]);
                if(cid[i][1]/arr[i]<x){
                    x=cid[i][1]/arr[i];
                }
                let changeValue = x * arr[i];
                if (changeValue > 0) {
                    baki -= changeValue;
                    baki=Math.round(baki*100)/100;
                    cid[i][1] -= changeValue;
                    changes[cid[i][0]] = changeValue;
                }
            }
        }
        total=randerDrawer();
        if(baki<0.01) baki=0;
        if(baki>0){
            const msg=document.createElement("h4");
            msg.innerText="Status: INSUFFICIENT_FUNDS";
            output.appendChild(msg);
        }
        else if(baki===0)
        {
            const msg=document.createElement("h4");
            if(total===0){
                msg.innerText="Status: CLOSED";
            }
            else{
                msg.innerText="Status: OPEN";
            }
            output.appendChild(msg);
            Object.keys(changes).forEach(key => {
                const msg=document.createElement("h4");
                msg.innerText=`${key}: $${changes[key]}`;
                output.appendChild(msg);
            });
        }
        
    }
}

let ammount;
btn.addEventListener("click",()=>{
    output.innerHTML="";
    total=randerDrawer();
    purchase(Number(input.value));
});

