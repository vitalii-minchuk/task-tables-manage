import React from "react"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import { Snackbar } from "@mui/material"
import { messageDeleteSuccess, SnackbarAlert } from "../utils"

function SimpleDialog(props) {
  const { onClose, open, regions, handelDeleteRegion } = props

  const handleClose = () => onClose()

  const handleListItemClick = (value) => {
    onClose();
    handelDeleteRegion(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chose one region</DialogTitle>
      <List sx={{ pt: 0 }}>
        {regions.map((region) => (
          <ListItem
            button
            onClick={() => handleListItemClick(region.id)}
            key={region.region}
          >
            <ListItemText primary={region.region} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export const DeleteRegionDialog = ({ regions, handelDeleteRegion }) => {
  const [openAlert, setOpenAlert] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleDialogOpen = () => setOpenDialog(true)

  const handleDialogClose = () => {
    setOpenDialog(false)
    setOpenAlert(true)
  }

  const handleAlertClose = (event, reason) => {
    if(reason === "clickaway") {
      return
    }
    setOpenAlert(false) 
  }

  return (
    <React.Fragment>
      <Button sx={{color: "brown"}} onClick={handleDialogOpen}>
        Delete region -
      </Button>
      <SimpleDialog
        open={openDialog}
        onClose={handleDialogClose}
        regions={regions}
        handelDeleteRegion={handelDeleteRegion}
      />
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleAlertClose}>
        <SnackbarAlert onClose={handleAlertClose} severity="error">
          {messageDeleteSuccess}
        </SnackbarAlert>
      </Snackbar>
    </React.Fragment>
  )
}