import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');



inputRef.addEventListener('input',debounce(handleInput, DEBOUNCE_DELAY));

function handleInput() {

    const inputValue = inputRef.value.trim();
    countryList.textContent = '';
    countryInfo.textContent = '';

    fetchCountries(inputValue);
    
    if (inputValue !== '') {
        return fetchCountries(inputValue).then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (data.length >= 2 && data.length <= 10) {
                createCountryList(data);
            } else if (data.length === 1) {
                createCountry(data);
            }
        })
            .catch((error) => Notify.failure('Oops, there is no country with that name'));
    } 
};


function createCountryList(countries) {
    const markup = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
           <span><b>${country.name.official}</b></span>
                  </li>`;
    })
    .join('');
    countryList.innerHTML = markup;
    const countryItemRef = document.querySelectorAll('li');
    countryItemRef.forEach(element => {
        element.style.listStyleType = 'none';
        element.style.marginBottom = '10px';
    });
    
}


function createCountry(countries) {
    console.log('countries', countries);
    
    const markup = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
           <span class="country-name"><b>${country.name.official}</b></span>
              <p><b>Capital</b>: ${country.capital}</p>
              <p><b>Population</b>: ${country.population}</p>
              <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                  </li>`;
    })
    .join('');
    countryList.innerHTML = markup;
    const countryNameRef = document.querySelector('.country-name');
    countryNameRef.style.fontSize = '28px';
    const countryItemRef = document.querySelector('li');
    countryItemRef.style.listStyleType = 'none';
    
}


