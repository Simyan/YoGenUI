import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YogenService } from '../yogen.service';
import { argument } from '../argument';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  yogenService: YogenService = inject(YogenService);
  technologyList: string[] = [];
  generators: string[] = [];
  arguments: argument[] = [];

  detailsForm = new FormGroup({
    technology: new FormControl(''),
    generator: new FormControl(''),
  });

  argumentsForm = new FormGroup({
    
  });

  constructor(private http: HttpClient) {
    this.yogenService.getAllTechnologies().then((resp) => { this.technologyList = resp });
    //this.yogenService.GetAllTechnologyGenarators().then((resp) => { this.generators = resp });
    this.detailsForm.get('technology')?.valueChanges.subscribe((v) => {
      let val = v ? v : '';
      this.getGenerators(val);
    })

    this.detailsForm.get('generator')?.valueChanges.subscribe((v) => {
      let val = v ? v : '';
      this.getArguments(val);
    })
  }

  getGenerators(technology : string ){
    this.yogenService.getAllTechnologyGenarators(technology).then((resp) => { this.generators = resp });
  }

  getArguments(generator : string ){
    this.yogenService.getArguments(generator).then((resp) => { 

      
      for(let item of resp){
        let arg : argument = { name: item.name, order: item.order, prompt: item.prompt, type: item.type, value: '' };
        console.log(arg);
        this.arguments.push(arg);
      }
      // this.arguments = resp;
      this.renderForm(); 
    });
  }

  renderForm(){
    console.log('rendering arguments form', this.arguments)
    for(let item of this.arguments){
      console.log('rendering arguments form');
      console.log(item.name);
      this.argumentsForm.addControl(item.name, new FormControl('', Validators.required));
    }
  }

  getPrompt(controlName : string){
    for(let item of this.arguments){
      if(item.name === controlName)
        return item.prompt;
    }
    return '';
  }

  formControlNames() {
    return Object.keys(this.argumentsForm.controls);
  }



  submit(){}
  submitArguments2(){ 
    console.log('args submitted');
    // console.log(this.argumentsForm);

    for(let item of this.arguments){
      let val = this.argumentsForm.get(item.name)?.value;
      // console.log(val);
      item.value = val;
    }

    // console.log(this.arguments);

    let result = { name: this.detailsForm.get('generator')?.value, args: this.arguments }
 
    console.log(result);

    this.http.post('http://localhost:3000/submit',  result, {responseType: 'blob'})
      .subscribe(response => {
        // Handle the response from the server
        const url = window.URL.createObjectURL(response);
        window.open(url);
        //  // Create an anchor element
        //  const a = document.createElement('a');
        //  a.href = url;
        //  a.download = result.args[0].value + '.zip'; // Specify the desired filename
 
        //  // Append the anchor to the body and click it to trigger the download
        //  document.body.appendChild(a);
        //  a.click();
 
        // //  // Remove the anchor from the body
        // //  document.body.removeChild(a);
 
        // //  // Release the blob URL
        // //  window.URL.revokeObjectURL(url);
        console.log(response);
      }, error => {
        // Handle errors
        console.error(error);
      });
    
  }


  submitArguments(){ 
    console.log('args submitted');
    // console.log(this.argumentsForm);

    for(let item of this.arguments){
      let val = this.argumentsForm.get(item.name)?.value;
      // console.log(val);
      item.value = val;
    }

    // console.log(this.arguments);

    let result = { name: this.detailsForm.get('generator')?.value, args: this.arguments }
 
    console.log(result);

    this.yogenService.downloadFile(result, 'http://localhost:3000/submit' ).subscribe(
      (blob: Blob) => {
        // Create a blob URL for the downloaded file
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = result.args[0].value + '.zip'; // Specify the desired filename

        // Append the anchor to the body and click it to trigger the download
        document.body.appendChild(a);
        a.click();

        // Remove the anchor from the body
        document.body.removeChild(a);

        // Release the blob URL
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
    
  }


}



