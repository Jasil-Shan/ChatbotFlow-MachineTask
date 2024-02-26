import SaveButton from '../SaveButton/SaveButton'

const Navbar = ({saveEditedNode}) => {
  return (
    <div className='flex h-fit bg-gray-300 p-1 rounded-md justify-end'>
        <SaveButton saveEditedNode={saveEditedNode} />
    </div>
  )
}

export default Navbar