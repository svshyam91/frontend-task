import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';

function App() {
    const [tableData, setTableData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastPage = Math.ceil(tableData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentTableData = tableData.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL =
                    'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';
                const response = await fetch(URL);
                if (response.ok) {
                    const data = await response.json();
                    console.log('data: ', data);
                    setTableData(data);
                }
            } catch (error) {
                console.error('Error calling api', error);
            }
        };
        fetchData();
    }, []);

    const goToNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Percentage Funded</th>
                        <th>Amount Pledged</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0
                        ? currentTableData.map((data: any) => (
                              <tr key={data['s.no']}>
                                  <td>{data['s.no']}</td>
                                  <td>{data['percentage.funded']}</td>
                                  <td>{data['amt.pledged']}</td>
                              </tr>
                          ))
                        : 'no data found'}
                </tbody>
            </table>
            <div className='footer'>
                <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>
                    {currentPage} of {lastPage}
                </span>
                <Button
                    onClick={goToNextPage}
                    disabled={currentPage === lastPage}
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default App;
