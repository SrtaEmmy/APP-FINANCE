const router = require('express').Router();
const Info = require("../models/m-info");

router.get('/', (req, res) => {
      res.render('app', {layout: "layouts/main"});
  });  

  let errors = [];
  // Ruta que recibe datos del formulario (crea nuevo info)
router.post('/receive-new-info', async (req, res) => {
      const { description, amount, isIncome } = req.body;
      
      const newInfo = new Info({
         description,
         amount,
         isIncome: isIncome === 'true' //si el value es "true" se cumple(true), sino(false)
      });

      if (!description) {
         errors.push({ text: 'Por favor ingresa una descripción del ingreso/gasto' });
      }
      if (!amount) {
         errors.push({ text: 'Por favor ingresa la cantidad' });
      }
      if (!isIncome) {
         errors.push({ text: 'Por favor ingresa el tipo de operación (ingreso o gasto)' });
      }
      if (isNaN(parseFloat(amount))) {
            errors.push({ text: 'La cantidad debe ser un dato numérico' });
          }
      if (parseFloat(amount)<0) {
            errors.push({ text: 'El numero debe ser positivo' });
          }
      if (errors.length > 0) {
            
      //    return res.render('app', { layout: 'layouts/main', errors });
         return res.redirect('/app');
      }
   
   
      await newInfo.save();
      res.redirect('/app');
   });
   

//ruta principal a la que es redireccionado muchas veces
//ruta que muestra los datos
router.get('/app', async(req, res)=>{
      const info = await Info.find({});
      const totals = await calculateTotalIncomesAndExpenses();
      const total = await totals.total.toFixed(2);//redondear
      const totalIncomes = await totals.totalIncomes.toFixed(2);
      const totalExpenses = await totals.totalExpenses.toFixed(2);
      const isTotalNegative =  await totals.total.toFixed(2) < 0;
      
     res.render('app', {layout: 'layouts/main', info, total, totalIncomes, totalExpenses, isTotalNegative, errors});
});


//funcion que calcula total, ingresos y gastos
const calculateTotalIncomesAndExpenses=async()=>{
      const totalInfo = await Info.find({});
      total = 0;
      totalIncomes = 0;
      totalExpenses = 0;
      for (const info of totalInfo) {
            if (info.isIncome) {
                  totalIncomes += info.amount; //sumar ingresos
                  total += info.amount; //sumar al total
            }else{
                  totalExpenses += info.amount; //sumar gastos
                  total -= info.amount; //restar al total
            }
      }
      return {totalIncomes, totalExpenses, total};  //hacer que retorne el valor para que asi al llamar a la funcion me devuelva siempre el valor
}

router.delete('/delete/:id', async(req, res)=>{
      // res.send('deleting '+ req.params.id);
      await Info.findByIdAndRemove(req.params.id,);
      res.redirect('/app')
});


//ruta mostrar grafico
router.get('/chart', async (req, res) => {
  const info = await Info.find({});
  const chartData = createChartData(info);
  res.render('chart', { layout: 'layouts/main', chartData: JSON.stringify(chartData) });
});

    
    // Función para crear los datos del gráfico
    const createChartData = (info) => {
      const labels = [];
      const data = [];
    
      let total = 0;
    
      for (const item of info) {
        total += item.isIncome ? item.amount : -item.amount;
        labels.push(item.description);
        data.push(total);
      }
    
      return { labels, data };
    };
    

    // Función para limpiar el arreglo errors
    const clearErrors = () => {
      errors = []; // Vaciar el arreglo errors
    };
    
    // Ejecutar la función clearErrors cada 3 segundos
    setInterval(clearErrors, 3000);
    


module.exports = router;