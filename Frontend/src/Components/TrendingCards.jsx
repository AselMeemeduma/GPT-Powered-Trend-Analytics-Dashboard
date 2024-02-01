import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Chart, registerables } from 'chart.js';
import {PieChart, BarChart} from '@mui/x-charts';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Grid } from '@mui/material';


Chart.register(...registerables);

function TrendingCard({ data }) {

  const matches = useMediaQuery('(max-width:600px)');


  // Prepare data for the Pie chart
  const pieData = {
    labels: data.keywords,
    datasets: data['country-percentage'].map((item, index) => ({
      label: data.countries[index],
      value: item,
      backgroundColor: 'randomColor', // replace with actual colors
    })),
  };

  const countryKeywordData = data.countries.map(country => {
    const keywordData = data['keyword-wise-country-percentage']
      .filter(item => item.country === country)
      .map(item => ({ label: item.keyword, data: item.percentage }));
    return { country, keywordData };
  });

  console.log(countryKeywordData);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" component="div">
              Analysis data for year : {data.year}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.3rem' }}>
              <strong>Keywords:</strong> {data.keywords.join(', ')}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.3rem' }}>
              <strong>Trends:</strong> {data.trends.join(', ')}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.3rem' }}>
              <strong>Countries:</strong> {data.countries.join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PieChart series={[{ data: pieData.datasets }]} width={matches ? 300 : 800} height={matches ? 200 : 400} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {countryKeywordData.map(({ country, keywordData }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={country}>
              <Typography variant="h6" component="div">
                {country}
              </Typography>
              <BarChart
                width={matches ? 350 : 700}
                height={matches ? 200 : 400}
                series={[{ data: keywordData.map((keywords, index) => keywords.data), label: country, id: `${country}Id` }]}
                xAxis={[{ data: data.keywords.map((keyword, index) => keyword), scaleType: 'band' }]}
              />
            </Grid>
          ))}
        </Grid>
        {/* Add more fields as needed */}
      </CardContent>
    </Card>
  );
};

export default function TrendingCards({ trendings }) {
  return (
    <div>
      {trendings && trendings.map((trending) => (
        <Box key={trending.year} sx={{ border: '1px solid #ccc', borderRadius: '4px', margin: '10px', padding: '10px' }}>
          <TrendingCard data={trending} />
        </Box>
      ))}
    </div>
  );
}