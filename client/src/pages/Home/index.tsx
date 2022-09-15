import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { H1, MySelect, Text, Button, CoffeeItem, Pagination } from '../../components';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { paginate } from '../../utils/paginate';
import { optionPrice, optionGrade, optionDegreeRoast, optionCountryGrowth  } from './helper';
import { fetchCoffeeAction } from '../../store/coffee/actions';
import { mainImg } from '../../assets/img/mainImg/index'
import _ from 'lodash';

import { fetchBasketAction } from '../../store/basket/actions';

export type SortBy = "asc" | "desc"
export const Home: FC = () => {
  
  const dispatch = useDispatch();
  const { coffee } = useTypedSelector((state) => state.coffee);
  const availableCoffee = coffee.filter((item) => item.available === true)
  const { userId }  = useSelector((state: RootStateOrAny) => state.user.auth); // fix it
  
  useEffect(() => {
    dispatch(fetchBasketAction(userId));
    if(!coffee.length) {
      dispatch(fetchCoffeeAction());
    }
  },[]);

  const { loading, error } = useTypedSelector((state) => state.coffee)

  const [sortBy, setSortBy] = useState<SortBy>("asc");
  const [sortByGrade, setSortByGrade] = useState<SortBy>("asc");
  const [roastDegree, setRoastDegree] = useState<string[]>([]);
  const [countryGrowth, setCountryGrowth] = useState<string[]>([]);
  
  const [iter, setIter] = useState("minPrice");
  const [filteredBy, setFilteredBy] = useState('byCountry');

  const isSortBy = iter === "minPrice" ? sortBy : sortByGrade;
  const sortedArray = _.orderBy(availableCoffee,[iter], [isSortBy]);

  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const filteredArray = sortedArray.filter((c) => {
    if(filteredBy === 'byRoast') {
      if(roastDegree.length) {
        return roastDegree.includes(c.degreeRoast);
      }
      return sortedArray;
    } else if(filteredBy === 'byCountry') {
      if(countryGrowth.length) {
        return countryGrowth.includes(c.country);
      }
      return sortedArray;
    }
  });

  const setFilteredByItem = (filteredBy: string) => {
    if(filteredBy === 'byRoast') {
      setFilteredBy('byRoast');
      setCountryGrowth([]);
      setCurrentPage(1);
    } else if(filteredBy === 'byCountry') {
      setFilteredBy('byCountry');
      setRoastDegree([]);
      setCurrentPage(1);
    }
  };
  const resetFilters = () => {
    setCountryGrowth([]);
    setRoastDegree([]);
  };
  
  const pageSize = 3;
  const slicedDataArray = paginate(filteredArray, currentPage, pageSize );
  return (
    <div className={styles.Home}>
      <div className={styles.wrapper}>   
        <div className={styles.CoffeeContainer}>
          <H1 className={styles.title}>Каталог кофе</H1>
          <div className={styles.selectWrapper}>
            <div className={styles.selectItemWrapper}>
              <Text>Цена</Text>
              <MySelect 
                options={optionPrice} 
                value={sortBy} 
                setValue={setSortBy}
                onInputChange={() => setIter("minPrice")} 
                className="custom-select" 
              />
            </div>
            <div className={styles.selectItemWrapper}>
              <Text>Степень обжарки</Text>
              <MySelect 
                options={optionDegreeRoast} 
                value={roastDegree} 
                setValue={setRoastDegree} 
                isMulti={true} 
                placeholder="Степень обжарки"
                onInputChange={() => setFilteredByItem('byRoast')}
                className="custom-select"
              />
            </div>
            <div className={styles.selectItemWrapper}>
              <Text>Страна произростания</Text>
              <MySelect 
                options={optionCountryGrowth} 
                value={countryGrowth} 
                setValue={setCountryGrowth} 
                isMulti={true} 
                placeholder="Страна произростания"
                onInputChange={() => setFilteredByItem('byCountry')}
                className="custom-select"
              />
            </div>
            <div  className={styles.selectItemWrapper}>
              <Text>Оценка Q-грейдера</Text>
              <MySelect
                options={optionGrade}
                value={sortByGrade} 
                setValue={setSortByGrade}
                onInputChange={() => setIter("grade")} 
                className="custom-select"
              />
            </div>
          </div>  

          <div className={styles.showedSorts}>
            {filteredArray.length ? 
              <Text size="lg" weight="regular">{`Показано сортов: ${filteredArray.length}`}</Text> :
              <Text size="lg" weight="regular">На данный момент лот отсутствует</Text>
            }
            <Button size="sm" onClick={resetFilters}>Сбросить фильтры</Button>
          </div>
          {loading && <H1>Loading...</H1>}
          {error && <H1 color="error">{error}</H1>}
          <div className={styles.wrapperCoffee}>
            {slicedDataArray.map((coffee) => (
              <CoffeeItem 
                key={coffee._id}
                id={coffee._id}
                name={coffee.name} 
                country={coffee.country} 
                images={coffee.images}
                minPrice={coffee.minPrice}
                maxPrice={coffee.maxPrice}
                forWhat={coffee.forWhat}
                fermentation={coffee.fermentation}
                description={coffee.description}
                acidity={coffee.acidity}
                density={coffee.density}
                maxValue={coffee.maxValue}
              />
            ))}
          </div>
          {filteredArray.length/pageSize > 1 && 
        <Pagination 
          length={filteredArray.length} 
          currentPage={currentPage}
          changePage={changePage}
          pageSize={pageSize}
        />
          }
        </div>
      </div>
    </div>
  );
};