import Pagination from '@mui/material/Pagination'
import { useContext } from 'react'
import Context from '../../Context'
const BasicPagination = () => {
  const { setPage, page } = useContext(Context)
  const handlePagination = (e, value) => setPage(value)
  console.log(page, 'page')
  return (
    <Pagination
      count={10}
      color="primary"
      onChange={handlePagination}
      size="large"
      page={page}
      sx={{ borderRadius: '10px' }}
    />
  )
}

export default BasicPagination
