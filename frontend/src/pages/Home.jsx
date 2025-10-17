import { useState } from 'react';
import { getProfile } from '@services/profile.service.js';
import { showErrorAlert } from '@helpers/sweetAlert.js';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProfile = async () => {
    setIsLoading(true);
    setProfileData(null);
    try {
      const response = await getProfile();
      if (response.status === 'Success') {
        setProfileData(response);
      } else {
        showErrorAlert('Error', response.message || 'No se pudo obtener el perfil');
      }
    } catch (error) {
      showErrorAlert('Error de Conexión', 'Hubo un problema al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>
        
        <button 
          onClick={handleGetProfile}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Cargando...' : 'Obtener Perfil'}
        </button>

        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <pre className="text-sm text-gray-700 overflow-auto whitespace-pre-wrap break-words">{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;