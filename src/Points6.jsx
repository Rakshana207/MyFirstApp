import React, { useState, useEffect } from 'react';
import match6 from './match6.json';

function Points() {
  const [data, setData] = useState(null);

  useEffect(() => {
    //setData(sample4.match1); // Assuming match1 is the array you want to iterate over

    //function to process JSON data
      const td=match6.match1.map(item=>{

      const fp=item.player1+item.player2+item.player3+item.player4;//calculating total kill points
      
      
      //function to calculate position points
      function calculatePositionPoints(pp) 
      {
        let wins=0;
        if (pp === 1) 
        {
            wins=1;
            return {pp:12,wins};
        } 
        else if (pp === 2) 
        {

            return {pp:9,wins};
        } 
        else if (pp === 3) 
        {
            return {pp:8,wins};
        } 
        else if (pp === 4) 
        {
            return {pp:7,wins};
        } 
        else if (pp === 5) 
        {
            return {pp:6,wins};
        }
        else if (pp === 6) 
        {
            return {pp:5,wins};
        } 
        else if (pp === 7) 
        {
            return {pp:4,wins};
        } 
        else if (pp === 8) 
        {
            return {pp:3,wins};
        } 
        else if (pp === 9) 
        {
            return {pp:2,wins};
        } 
        else if (pp === 10) 
        {
            return {pp:1,wins};
        } 
        else if (pp === 11) 
        {
            return {pp:0,wins};
        } 
        else 
        {
            return {pp:0,wins};
        }
    }

      const {pp,wins}=calculatePositionPoints(item.position);
      const tp=fp+pp;
      
      return{
        ...item,//spread the original team object
        fp,pp,tp,
        wins
      };
    });

    //after calculating all, first sort out based on total kill points(fp)
    /*b.tp - a.tp: This expression subtracts the tp property of a from the tp property of b.
    If b.tp is greater than a.tp, the result will be positive, indicating that b should come before a in the sorted array.
    If b.tp is less than a.tp, the result will be negative, indicating that a should come before b in the sorted array.
    If b.tp is equal to a.tp, the result will be zero, indicating that the order of a and b should remain unchanged.*/
    td.sort((a,b)=>b.tp-a.tp);
    

    console.log(td);


    for(let i=0;i<td.length;i++)
    {
      //check if the current team has 0 wins
        for(let j=0;j<td.length;j++)
        {
          //if(td[j].wins===0 && (td[j].tp<td[i].tp || (td[j].tp===td[i].tp && td[j].wins!=0) && td[j].fp<td[i].fp)))
          // Check if both the current team and the comparing team have zero wins and the comparing team's total points are less
          if(td[j].tp===td[i].tp && td[i].wins===1 ) 
          {
              //js has no swap function, 
              const temp=td[i];
              td[i]=td[j];
              td[j]=temp;
          }
          // Check if both teams have the same total points, but the comparing team has won a match
          else if(td[j].tp===td[i].tp && ((td[i].wins===0 &&td[j].wins===0)||(td[i].wins===1 && td[j].wins===1 ))&& td[i].fp>td[j].fp)
          {
            const temp1=td[i];
            td[i]=td[j];
            td[j]=temp1;
          }
          // Check if both teams have zero wins and the comparing team has fewer total points but the same total kill points
          else if(td[i].tp===td[j].tp && ((td[i].wins===0&&td[j].wins===0)||(td[i].wins===1 && td[j].wins===1 ))&& td[i].fp===td[j].fp&&td[i].pp>td[j].pp)
          {
            const temp2=td[i];
            td[i]=td[j];
            td[j]=temp2;
          }
      
        
      }
    }

   
    //set the td to state
    setData(td);
  },[]);
  
  

  return (
    <div class="container">
      <h1>Match 6 standings</h1>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Wins</th>
              <th>Kill Points</th>
              <th>Position Points</th>
              <th>Total Points</th>
              
              
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.teamName || item.teamName1}</td>
              <td>{item.wins}</td>
              <td>{item.fp}</td>
              <td>{item.pp}</td>
              <td>{item.tp}</td>
              
              
            </tr>
          ))}
        </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Points;