import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { exit } from 'process';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // password: string = 'CCA';
	// characters: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	// characters: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	characters: string[] = ['A','B','C','D'];
	t0;
	tries = 0;
	
	passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
	}

  ngOnInit() {
		this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4),  Validators.maxLength(4)]]
    });
  }
	
	checkPassword(password) {
		this.tries = 0;
		this.t0 = performance.now();
		// instantiate match in root to enable return on match
		let match;
		// test first char
    for(let a=0; a < this.characters.length; a++) {
			//test second char
			for(let b=0; b < this.characters.length; b++) {
				// test third char
				for(let c=0; c < this.characters.length; c++) {
					// test fourth char
					for(let d=0; d < this.characters.length; d++) {
						console.log(this.characters[a], this.characters[b], this.characters[c], this.characters[d]);
						this.tries++;
						console.log("Tries: ", this.tries);
						let match = this.matchPassword(password, a, b, c, d);
						if(match) return;
					}
				}
			}
			if(match) return;
    }
	}

	matchPassword(password, a, b, c, d) {
		let testString = this.characters[a] + this.characters[b] + this.characters[c] + this.characters[d];
		if(testString == password) {
			console.log(testString + " is a match.");
			let t1 = performance.now();
			console.log("The match took " + (t1 - this.t0) + " milliseconds.");
			return true;
		}
	}

	enterPassword(form) {
		console.log(this.passwordForm.value.password);
		this.checkPassword(this.passwordForm.value.password);
	}


}
