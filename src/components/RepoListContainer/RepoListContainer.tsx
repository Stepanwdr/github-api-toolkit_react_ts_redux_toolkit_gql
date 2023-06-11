import { FC, Fragment, SyntheticEvent, useEffect, useMemo, useState } from "react";
import styles from './RepoListContainer.module.css'
import Repo from "./Repo/Repo";
import RepoSearchInput from "../RepoSearchInput/RepoSearchInput";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { searchRepos } from "../../store/reducers/ActionCreators";
import Paginator from "../Paginator/Paginator";
import SearchActionList from "../SearchActionList/SearchActionList";
import { ISearch } from "../../model/ISearch";
import { logedUser } from "../../consts/token";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IStorage } from "../../types/IStorage";
import isEmpty from "../../helpers/isEmpty";

const RepoListContainer: FC = () => {
  const [storedData, setStoredData, getStoredData, removeStoredData] = useLocalStorage<IStorage>("storedData", {} as IStorage)
  const [searchValue, setSearchValue] = useState('')
  const [searcShow, setSearchShow] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsToShow, setItemsToShow] = useState(10)
  const { reposes, isLoading, error, pageInfo, repositoryCount } = useAppSelector(state => state.reposSlice)
  let perPage = 35//26= 10 - 10 -6
  const totalPages = Math.ceil(repositoryCount / perPage);
  const lastPage = Math.ceil(reposes.length / 10)//3
  const [startPage, setStartPage] = useState(-reposes.length)
  const [endPage, setEndPage] = useState(currentPage * 10)
  let storageState: IStorage = {
    search: "",
    first: perPage,
    startPage,
    currentPage,
    endPage,
    query:""
  }

  //let itemsToShow=Math.floor(repositoryCount / 10)

  const dispatch = useDispatch()

  const cleareFilter = () => {
    const query = `user:${logedUser}`
    const searchData: ISearch = {
      query,
      first: perPage,
    }
    dispatch(searchRepos(searchData));
    setSearchValue('')
    setCurrentPage(1)
    setSearchShow(false)
  }

  const handleSearch = (val: string) => {
    if (val.trim()) {
      setSearchValue(val)
      setSearchShow(true)
    }
  };

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault()
    if (searchValue.trim()) {
      const query = `${searchValue}`
      dispatch(searchRepos({ query, first: perPage }))
      setSearchShow(false)
      setCurrentPage(1)
      setStartPage(-reposes.length - 10)
      setEndPage(10)
      storageState = {
        ...storageState,
        query,
        first: perPage,
        startPage: -reposes.length - 10,
        currentPage: 1,
        endPage: 10,
        search:searchValue
      }
      setStoredData(storageState)
    }
  }

  const selectFirstPage = (searchData: ISearch) => {
    searchData.before = ""
    searchData.after = ""
    dispatch(searchRepos(searchData));
    setStartPage(-reposes.length)
    setEndPage(10)
  }

  const onPageChange = (page: number) => {
    if (!searchValue && page === currentPage) return;
    const query = !searchValue ? `user:${logedUser} ${searchValue}` : searchValue;
    let after = '';
    let before = '';
    const searchData: ISearch = {
      query,
      first: perPage,
      after,
      before
    }
    if (page === 1) {
      selectFirstPage(searchData)
    } else if (page === lastPage) {
      setEndPage(reposes.length + page * 10)
      setStartPage(-reposes.length % 10)
    } else {
      if (repositoryCount > reposes.length) {
        searchData.after = reposes[9]?.cursor
        changeNextPage(searchData)
      }
      setStartPage(10)
      setEndPage((reposes.length + 10) - (reposes.length - 10))
    }
    console.log("*******************")
    setStoredData({
      first: perPage,
      startPage,
      currentPage: page,
      endPage,
      query,
      search:searchValue
    } as IStorage)
    setCurrentPage(page);
  };
  const changeNextPage = (searchData: ISearch) => {
    dispatch(searchRepos(searchData));
  }
  const changePrevPage = (searchData: ISearch) => {
    dispatch(searchRepos(searchData));
  }
  useMemo(() => {
    if (!searchValue) {
    cleareFilter()
    }
  }, [searchValue])

  useEffect(() => {
    const repoData = getStoredData()
    if (!isEmpty(repoData)) {
      setStartPage(repoData?.startPage)
      setEndPage(repoData?.endPage)
      setCurrentPage(repoData?.currentPage)
      dispatch(searchRepos({ query: repoData?.query, first: 35 }));
      setSearchValue(repoData?.search)
    }
  }, [])

  if (error) return <p>Error :{error}</p>;

  return <div className={styles.list__container}>
    <RepoSearchInput
      onChange={(ev) => handleSearch(ev.target.value)}
      value={searchValue}
      onSubmit={handleSubmit}
      clearInput={cleareFilter}
    />
    {searcShow && searchValue ? <SearchActionList
      searchValue={searchValue}
      search={handleSubmit}
    /> : ''}
    <p className={styles.top}>
      Repositories {searchValue && `${repositoryCount}(results)`}
    </p>
    <ul className={styles.list}>
      {isLoading
        ? 'Loading...'
        : !reposes.length
          ? 'Not data found'
          : reposes
            .slice(startPage, endPage)
            .map((node: any, index: number) => {
              const repo = node.node
              return <Fragment key={repo.pushedAt}><span>{index + 1}</span><Repo repo={repo}/></Fragment>
            })
      }
    </ul>
    {
      repositoryCount > 5 && !isLoading
        ? <Paginator
          currentPage={currentPage}
          totalPages={repositoryCount}
          onPageChange={onPageChange}
        /> : ''}

  </div>
}
export default RepoListContainer
   /* if (searchValue) {
setStartPage((-reposes.length % 10) - 5)
}*/
/*  if (page < currentPage) {
    console.log("page<currentPage")
    setStartPage(10)
    setEndPage((reposes.length + 10) - (reposes.length - 10))
 
    if (searchValue && page > 2) {
      searchData.before
      searchData.after = reposes[page - 3]?.cursor
    }
  }*/


/* after = reposes[lastPage - 1]?.cursor; // Cursor of the last item on the previous page
 before = reposes[(page - 2) * reposes.length]?.cursor; // End of the list; Cursor of the last item on the current page
 after = reposes[(page - 2) * 10]?.cursor; // Cursor of the last item on the previous page
 before = reposes[(page * 10)]?.cursor; // Cursor of the last item on the current page
 */