import React from 'react';
import firebase, {db} from './firebase';
// import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditProduct from "./EditProduct";
// import {NavLink} from "react-router-dom";

const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    root: {
        padding: theme.spacing.unit * 3,
        // minWidth: 1350,
        // minWidth: 1200,
        minWidth: 500,
        width: '95%',
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
        // margin: `${theme.spacing.unit *3} auto`,
        // marginTop: theme.spacing.unit * 4,
        // marginLeft: 'auto',
        // marginRight: 'auto'
        // textAlign: 'center',
    },
    table: {
        minWidth: 1200
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px'
    }
});

const TableHeader = (props) => {

    const headings = [
        {
            displayName: 'Name',
            objectName: 'name'
        },
        {
            displayName: 'Category',
            objectName: 'category'
        },
        {
            displayName: 'Price',
            objectName: 'price'
        },
        {
            displayName: 'Currency',
            objectName: 'currency'
        },
        {
            displayName: 'SKU',
            objectName: 'SKU'
        },
        {
            displayName: 'Image URL',
            objectName: 'imageUrl'
        },
        {
            displayName: 'Description',
            objectName: 'description'
        },
        // {
        //     displayName: 'Action',
        //     objectName: 'action'
        // }
    ];

    // let arrow;
    // if (props.sort.direction === 'desc') {
    //     arrow = <i className="material-icons">arrow_downward</i>;
    // } else if (props.sort.direction === 'asc') {
    //     arrow = <i className="material-icons">arrow_upward</i>;
    // }
    //
    const handleClick = heading => {
        const newSortState = [];
        if (heading === 'price' || heading === 'SKU') {
            newSortState.push('numeric');
        } else {
            newSortState.push('alphabetic');
        }
        newSortState.push(heading);
        props.sort.direction === 'desc' ? newSortState.push('asc') : newSortState.push('desc');
        props.updateSortState(...newSortState);
    };
    //
    // return (
    //     <TableRow>
    //         {headings.map(heading => (
    //             <TableCell padding={'dense'} onClick={() => handleClick(heading.objectName)} key={heading.objectName} align={'center'}>
    //                 {heading.displayName}
    //                 {props.sort.category === heading.objectName && arrow}
    //             </TableCell>
    //         ))}
    //         <TableCell padding={'dense'} align={'center'}>Action</TableCell>
    //     </TableRow>
    // );

    // ^ prettier version below
    return (
        <TableRow>
            {headings.map(heading => (
                    <TableCell
                        key={heading.objectName}
                        align={'left'}
                        padding={'dense'}
                    >
                        <Tooltip
                            title="Sort"
                            // placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                            placement={'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={props.sort.category === heading.objectName}
                                direction={props.sort.direction}
                                onClick={() => handleClick(heading.objectName)}
                            >
                                {heading.displayName}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                )
            )}
            <TableCell padding={'dense'} align={'center'}>Action</TableCell>
        </TableRow>
    );
};

const ProductRows = props => (
    props.allProducts.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map(product => (
        <TableRow hover key={product.SKU}>
            <TableCell padding={'dense'} align={'left'}>{product.name}</TableCell>
            <TableCell padding={'dense'} align={'left'}>{product.category}</TableCell>
            <TableCell padding={'dense'} align={'left'}>{product.price}</TableCell>
            <TableCell padding={'dense'} align={'left'}>{product.currency}</TableCell>
            <TableCell padding={'dense'} align={'left'}>{product.SKU}</TableCell>
            <TableCell padding={'dense'} align={'left'}>{product.imageUrl}</TableCell>
            <TableCell padding={'dense'} align={'left'}>{product.description}</TableCell>
            <TableCell padding={'dense'} align={'center'}>
                <IconButton onClick={props.handleEdit(product)} variant={'extendedFab'}>
                    <i className='material-icons'>edit</i>
                </IconButton>
                {/*<EditDialog SKU={product.SKU} category={product.category} name={product.name} handleEdit={props.handleEdit}/>*/}
                {/*<IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>*/}
                {/*delete*/}
                {/*</i></IconButton>*/}
                <DeleteDialog SKU={product.SKU} category={product.category} name={product.name}
                              handleDelete={props.handleDelete}/>
            </TableCell>
        </TableRow>
    ))
);

// const ProductRows = withStyles(styles)(props => (
//     props.allProducts.map(product => (
//         <TableRow key={product.SKU}>
//             <TableCell className={props.classes.smallCol}>{product.name}</TableCell>
//             <TableCell>{product.category}</TableCell>
//             <TableCell>{product.price}</TableCell>
//             <TableCell>{product.currency}</TableCell>
//             <TableCell>{product.SKU}</TableCell>
//             <TableCell>{product.imageUrl}</TableCell>
//             <TableCell>{product.description}</TableCell>
//             <TableCell>
//                 <IconButton onClick={props.handleEdit} variant={'extendedFab'}><i className='material-icons'>
//                     edit
//                 </i></IconButton>
//                 {/*<EditDialog SKU={product.SKU} category={product.category} name={product.name} handleEdit={props.handleEdit}/>*/}
//                 {/*<IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>*/}
//                 {/*delete*/}
//                 {/*</i></IconButton>*/}
//                 <DeleteDialog SKU={product.SKU} category={product.category} name={product.name}
//                               handleDelete={props.handleDelete}/>
//             </TableCell>
//         </TableRow>
//     ))
// ));

class DeleteDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <IconButton onClick={this.handleClickOpen} variant={'extendedFab'}><i className='material-icons'>
                    delete
                </i></IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    // aria-labelledby='alert-dialog-title'
                    // aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='delete-dialog-title'>Delete {this.props.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='delete-dialog-description'>
                            Delete selected product from database (SKU: {this.props.SKU}). This action is permanent.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary' autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleDelete(this.props.SKU, this.props.category)} color='primary'>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

class ShowProducts extends React.Component {
    state = {
        allProducts: [],
        sort: {
            type: 'numeric',
            category: 'SKU',
            direction: 'asc'
        },
        edit: {
            isEdit: false
        },
        // edit: false,
        // editSKU: '',
        // editCategory: ''

        // pagination
        page: 0,
        rowsPerPage: 5
    };
    // dzisiaj - all in one
    getDataFromDb = categories => {
        const result = [];
        categories.forEach(category => {
            db.collection(category).get().then(products => {
                products.forEach(product => result.push(product.data()));

                // TODO: CZY TO W TYM MIEJSCU JEST OK? SORTUJE 5X (PO KAZDEJ KAT)
                result.sort((a, b) => a.SKU - b.SKU);
                // this.handleSort(Object.values(this.state.sort));

                this.setState({
                    allProducts: result
                });

            }).catch(error => console.log('Error getting data: ' + error));
        });
    };

    handleEdit = product => () => {
        // TODO: add handle sort before set state (without changing state during sort)
        this.setState({
            edit: {
                isEdit: true,
                product
            }
        });
    };

    finishEdit = updatedProduct => {
        //TODO: check if this can be done better
        let newAllProducts = [...this.state.allProducts];
        const index = newAllProducts.map(e => e.SKU).indexOf(updatedProduct.SKU);
        newAllProducts.splice(index, 1, updatedProduct);
        this.setState({
            allProducts: newAllProducts,
            edit: {
                isEdit: false
            }
        });
    };

    handleDelete = (SKU, category) => () => {
        const newAllProducts = this.state.allProducts.filter(product => product.SKU !== SKU);
        this.setState({
            allProducts: newAllProducts
        });

        db.collection(category).doc(SKU).delete()
            .then(() => console.log('Product successfully deleted.'))
            .catch(error => console.log('Error removing product: ', error));
    };

    updateSortState = (type, category, direction) => {
        this.setState({
            sort: {
                type,
                category,
                direction
            }
        });

        this.handleSort(type, category, direction);
    };

    handleSort = (type, column, direction) => {
        let newAllProducts = [...this.state.allProducts];

        if (type === 'numeric') {

            if (direction === 'desc') {
                newAllProducts.sort((a, b) => parseInt(b[column]) - parseInt(a[column]));
            } else if (direction === 'asc') {
                newAllProducts.sort((a, b) => parseInt(a[column]) - parseInt(b[column]));
            }
        } else if (type === 'alphabetic') {
            if (direction === 'desc') {
                newAllProducts.sort((a, b) => {
                    if (a[column] > b[column]) {
                        return -1;
                    }
                    if (a[column] < b[column]) {
                        return 1;
                    }
                    return 0;
                });
            } else if (direction === 'asc') {
                newAllProducts.sort((a, b) => {
                    if (a[column] < b[column]) {
                        return -1;
                    }
                    if (a[column] > b[column]) {
                        return 1;
                    }
                    return 0;
                });
            }
        }

        this.setState({
            allProducts: newAllProducts
        });
    };

    // pagination
    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes} = this.props;

        let result;
        if (this.state.edit.isEdit) {
            result = <EditProduct product={this.state.edit.product} finishEdit={this.finishEdit}/>
        } else if (this.state.allProducts.length > 0) {
            result = (
                <React.Fragment>
                    <Paper className={classes.root}>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableHeader sort={this.state.sort}
                                                 updateSortState={this.updateSortState}
                                    />
                                </TableHead>
                                <TableBody>
                                    <ProductRows allProducts={this.state.allProducts}
                                                 handleEdit={this.handleEdit}
                                                 handleDelete={this.handleDelete}
                                        // pagination
                                                 page={this.state.page}
                                                 rowsPerPage={this.state.rowsPerPage}
                                    />
                                </TableBody>
                            </Table>
                        </div>
                        {/* pagination */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.state.allProducts.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            // backIconButtonProps={{
                            //     'aria-label': 'Previous Page',
                            // }}
                            // nextIconButtonProps={{
                            //     'aria-label': 'Next Page',
                            // }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                </React.Fragment>
            );
        } else {
            result = (
                <div className={classes.loader}>
                    <CircularProgress/>
                </div>
            );
        }

        return result;
    }

    componentDidMount() {
        this.getDataFromDb(['hoodie', 'jumper', 't-shirt', 'tank-top', 'windbreaker']);
    }
}

export default withStyles(styles)(ShowProducts);