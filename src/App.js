import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import imageApi from './services/imageApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal';
import Container from './components/Container';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      imageApi
        .fetchImage(query, page)
        .then(res => {
          const { hits } = res;

          if (!hits.length) {
            toast.error(`По запросу ${query} ничего нет!`);
          }

          if (!!hits.length) {
            toast.success('Запрос выполнен успешно!');
            setImages(prevImages => [...prevImages, ...hits]);
            setIsLoading(false);
            setShowButton(true);
          }

          if (hits.length < 12) {
            setShowButton(false);
          }

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error));
    };
    query && fetchImages();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setShowButton(false);
    setError(error);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(page => (page += 1));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = ({ target }) => {
    setActiveImage(target.dataset);
    toggleModal();
  };

  return (
    <Container>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={activeImage.largeimageurl} alt="" />
        </Modal>
      )}

      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} onClick={openModal} />}
      {showButton && (
        <Button onClick={handleLoadMore}>
          {isLoading ? (
            <Loader type="Puff" color="#00BFFF" height={10} width={10} />
          ) : (
            'Load more...'
          )}
        </Button>
      )}
      <ToastContainer />
    </Container>
  );
};

export default App;
