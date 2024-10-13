import { useParams } from 'react-router-dom';
import { CardDataComponent } from "./CardDataComponent";
export default function CardPage() {
    const params = useParams();
    const id = parseInt(params.cardId.toString());

    return (
        <CardDataComponent id={id} loadingText="Solicitando la conexión" />
    );

}