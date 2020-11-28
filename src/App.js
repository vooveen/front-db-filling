import * as React from 'react';
import { Formik, Form, Field , FieldArray} from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField, Select , Switch} from 'formik-material-ui';
import {TextField as Timhilti}  from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';


 const modules =[
"Anatomie",
"Anatomie pathologique",
"Biochimie",
"Cardiologie et pathologie vasculaire",
"Cytologie",
"Dermatologie",
"Embryologie",
"Endocrinologie-Métabolisme",
"Epidémiologie",
"Génétique",
"Gynécologie-Obstétrique",
"Hématologie",
"Hépato-gastro-entérologie",
"Histologie",
"Immunologie",
"Maladies infectieuses",
"Médecine du travail",
"Médecine légale et toxicologie",
"Microbiologie",
"Néphro-urologie",
"Neurologie",
"Ophtalmologie",
"Orthopédie",
"Oto-rhino-laryngologie",
"Parasitologie",
"Pédiatrie",
"Pharmacologie",
"Physiologie",
"Pneumologie",
"Psychiatrie",
"Radiologie",
"Rééducation",
"Rhumatologie",
"Cancérologie",
"Appareil locomoteur",
"Nutrition",
"Santé Publique",
"Stomatologie"
 ]


 

 
 function App() {
   const [propNumber,setPropNumber]= React.useState(5);
   const [unchangedValue,SetUnchangedValue] = React.useState({
     module:'Anatomie',
     cours:'',
     synthese:'',
     enonce:'',
     comment:'',
     propositions:Array.from({ length: 5 }, () => ({
      proposition:'',
      solution:false
     }))
   })
   return (
   <>
   <br />
   <br />
           <Grid container spacing={2}>
           <Grid item xs={10}>
   <Timhilti
          
          label="Nombre de Proposition"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
         // value={propNumber}
          variant="outlined"
          fullWidth
          onKeyDown={(e)=>{
           
            if(e.keyCode === 13) {
              setPropNumber(e.target.value);
              
              SetUnchangedValue({
                ...unchangedValue,
               
                propositions:  Array.from({ length: e.target.value }, () => ({
                  proposition:'',
                  solution:false
                 }))
              })
            }
          }}
          //onChange={(e)=>}
        /></Grid>
          <Grid item xs={2}>
        <p>Nombre de Proposition:{propNumber}</p>
        </Grid>
        </Grid>
     <Formik
     enableReinitialize
       initialValues={unchangedValue}
       validate={values => {
       SetUnchangedValue({
         ...unchangedValue,
         module:values.module,
         cours:values.cours,
         synthese:values.synthese
       })
      }}
       onSubmit={(values, { setSubmitting, setValues}) => {
     
           setSubmitting(false);
           let c;
           if(values.propositions.length === 1) c=1
           else 
           c=values.propositions.reduce((acc,cur)=> +acc.solution  + +cur.solution
           )
           const source ={...values,type_question:c >1 ?'QCM':'QCS'}
           alert(JSON.stringify(source, null, 2));
           const payload = {...values, enonce: '', comment:'',propositions:  Array.from({ length: 5}, () => ({
            proposition:'',
            solution:false
           }))} 
             setValues(payload)
           
       
       }}
     >
       {({ submitForm, isSubmitting, values }) => (
         <Form>
           <Grid container spacing={2}>
           <Grid item xs={4}>
             <Field
             component={Select}
             name="module"
             type="module"
             label="Module"
             fullWidth
             variant="outlined"
           >
          { modules.map(e=>
            <MenuItem value={e}>{e}</MenuItem>)}
            </Field>
            <br />
            <br />
           <Field
             component={TextField}
             name="cours"
             type="cours"
             label="Cours"
             fullWidth
             variant="outlined"
           />
           <br />
           <br />
           <Field
             component={TextField}
             multiline
             rowsMax={10}
             name="synthese"
             type="synthese"
             label="Synthese"
             fullWidth
             variant="outlined"
           />
           <br />
           </Grid>
           <Grid item xs={8}>
           <Field
             component={TextField}
             multiline
             rowsMax={10}
             type="enonce"
             name="enonce"
             label="Enoncé"
             fullWidth
             variant="outlined"
           />
             <br />
            <br />
           <Field
             component={TextField}
             multiline
             rowsMax={10}
             type="comment"
             name="comment"
             label="Commentaire"
             fullWidth
             variant="outlined"
           />
             <br />
            <br />
            <p>Proposition:</p>
           <Grid container spacing={2}>
                 {
                   values.propositions.map((value, index) => (
                     <>
                      <Grid item xs={10}>
                    <Field
                    component={TextField}
                    multiline
                    rowsMax={10}
                    name={`propositions.${index}.proposition`}
                    label={`propositions${index+1}`}
                    fullWidth
                   variant="outlined"
                  />
                  </Grid>
                  <Grid item xs={2}>
                  <label>
                  <Field type="checkbox" name={`propositions.${index}.solution`} />
                  {`${value.solution}`}
                </label>
                </Grid>
                     </>
                 ))}
                 </Grid>
             
           
</Grid>
           {isSubmitting && <LinearProgress />}
           <br />
           <Button
             variant="contained"
             color="primary"
             disabled={isSubmitting}
             onClick={submitForm}
             fullWidth
           >
             Submit
           </Button>
           </Grid>
         </Form>
       )}
     </Formik>
     </>
   );
 }

export default App;
