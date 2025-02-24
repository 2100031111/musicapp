import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start; 
`;

const PodcastList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-top: 10px;
  flex-grow: 1;  
  align-items: flex-end;  
  flex-wrap: wrap;  
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


const PodcastCard = styled.div`
  background-color: ${({ theme }) => theme.card_bg};
  border-radius: 10px;
  padding: 15px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PodcastImage = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

const PodcastTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin: 10px 0 5px;
`;



const musicPodcasts = [
  {
    id: 1,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/544/Sabdham-Telugu-2025-20250213230802-500x500.jpg',
  },
  {
    id: 2,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/245/Wherever-You-Go-From-Robinhood-Telugu-2025-20250214151702-500x500.jpg',
  },
  {
    id: 3,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/245/Wherever-You-Go-From-Robinhood-Telugu-2025-20250214151702-500x500.jpg',
  },
  {
    id: 4,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/508/Sankranthiki-Vasthunam-Telugu-2025-20250114191008-500x500.jpg',
  },
  {
    id: 5,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/454/Game-Changer-Telugu-Telugu-2025-20250204083253-500x500.jpg',
  },
  {
    id: 6,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/222/Kadhalikka-Neramillai-Telugu-Telugu-2025-20250213171003-500x500.jpg',
  },
  {
    id: 7,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image:'https://c.saavncdn.com/862/Priyathama-Telugu-2025-20250210201007-500x500.jpg',
  },
  {
    id: 8,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image: 'https://c.saavncdn.com/673/Maata-Vinaali-From-Hari-Hara-Veera-Mallu-Telugu-Telugu-2025-20250116140745-500x500.jpg',
  },
  {
    id: 9,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image :'https://c.saavncdn.com/605/Saami-Soodaraa-From-Baapu-Telugu-2025-20250218110052-500x500.jpg',
  },
  {
    id: 10,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image :'https://c.saavncdn.com/284/Shiva-Shiva-Shankaraa-From-Kannappa-Telugu-Telugu-2025-20250210171004-500x500.jpg',
  },
  {
    id: 11,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image :'https://c.saavncdn.com/845/Bachelors-Anthem-From-Mazaka-Telugu-2025-20250129100925-500x500.jpg',
  },
  {
    id: 12,
    title: 'Popular Songs',
    description: 'Conversations with top musicians and producers.',
    image :'https://c.saavncdn.com/072/Premistava-From-Premistava-Telugu-2025-20250129191013-500x500.jpg',
  },
  
  
  
];

const Dashboard = () => {
  return (
    <DashboardMain>
      <FilterContainer>
        <Topic>
          Most Popular Music Podcasts
        </Topic>
        <PodcastList>
          {musicPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id}>
              <PodcastImage src={podcast.image} alt={podcast.title} />
              <PodcastTitle>{podcast.title}</PodcastTitle>
            </PodcastCard>
          ))}
        </PodcastList>
      </FilterContainer>
    </DashboardMain>
  );
};

export default Dashboard;