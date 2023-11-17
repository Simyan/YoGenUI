import { Injectable } from '@angular/core';
import { argument } from './argument';

@Injectable({
  providedIn: 'root'
})
export class YogenService {
  url = 'http://localhost:3000/technology';

 
  constructor() { }

  async getAllTechnologies(): Promise<string []> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
    
}


async getAllTechnologyGenarators(technology : string): Promise<string []> {
  const data = await fetch('http://localhost:3000/getAllGenerators/' + technology);
  return (await data.json()) ?? [];
}

async getArguments(generator : string): Promise<argument[]> {
  const data = await fetch('http://localhost:3000/getGeneratorByName/' + generator);
  return (await data.json()) ?? [];
}
}
